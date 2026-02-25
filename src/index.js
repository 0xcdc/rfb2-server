import cookieParser from 'cookie-parser';
import { createHandler } from 'graphql-http/lib/use/express';
import credentials from '../credentials.js';
import { dirname } from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { resolvers } from './resolvers.js';
import { typeDefs } from './types.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cookieParser());
app.use('/graphql', express.json());

function logResponseBody(req, res, next) {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (...restArgs) => {
    if (req.originalUrl.toLowerCase() == '/graphql') {
      chunks.push(Buffer.from(restArgs[0]));
    }
    oldWrite.apply(res, restArgs);
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) {
      if (req.originalUrl.toLowerCase() == '/graphql') {
        chunks.push(Buffer.from(restArgs[0]));
      }
    }

    const body = req.originalUrl.toLowerCase() == '/graphql' ?
      Buffer.concat(chunks).toString('utf8').slice(1, 2000) :
      '';

    console.log({
      time: new Date().toUTCString(),
      ua: req.headers['user-agent'],
      fromIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      referer: req.headers.referer || '',
      method: req.method,
      originalUri: req.originalUrl,
      uri: req.url,
      requestData: req.body ?? '',
      responseStatus: res.statusCode,
      responseData: body ?? '',
    });

    // console.log(body);
    oldEnd.apply(res, restArgs);
  };

  next();
}

app.use(logResponseBody);

app.use((req, res, next) => {
  const { username: validUser, password: validPass } = credentials.website;
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };

  if (!validUser || !validPass) {
    console.error('CRITICAL: Website credentials not configured.');
    return res.status(500).send('Server Configuration Error');
  }

  const authValue = req.headers.authorization || req.cookies.authorization;

  if (!authValue || !authValue.startsWith('Basic ')) {
    return reject();
  }

  try {
    const [, base64Credentials] = authValue.split(' ');
    const [username, password] = Buffer.from(base64Credentials, 'base64').toString().split(':');
    const validCredentials = (username === validUser && password === validPass);
    if (!validCredentials) {
      return reject();
    }

    const options = {
      secure: true,
      httpOnly: true,
      maxAge: 1000*60*60*24*30, // 30 days
      sameSite: 'Lax',
    };
    res.cookie('authorization', authValue, options);

    return next();
  } catch (err) {
    console.error(err);
    return reject();
  }
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/graphql', createHandler({
  schema: typeDefs,
  rootValue: resolvers,
}));

app.get('/graphiql', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'graphiql.html'));
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port);
console.log('Running a GraphQL API server at http://localhost:' + port + '/graphql');
