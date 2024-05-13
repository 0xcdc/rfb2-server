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
  if (credentials.websiteUsername === '' && credentials.websitePassword === '') return next();

  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };

  let { authorization } = req.headers;
  if (!authorization) {
    ({ authorization } = req.cookies);
  }

  if (!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');

  if (! (username === credentials.websiteUsername && password === credentials.websitePassword)) {
    return reject();
  }

  const cookieValue = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
  const options = {
    secure: true,
    maxAge: 1000*60*60*24*30, // 30 days
  };
  res.cookie('authorization', cookieValue, options);

  return next();
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
