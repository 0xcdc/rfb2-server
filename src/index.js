import credentials from '../credentials';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import path from 'path';
import { resolvers } from './resolvers';
import { typeDefs } from './types';

const app = express();

app.use((req, res, next) => {
  console.log({ url: req.url });
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic');
    res.sendStatus(401);
  };

  const { authorization } = req.headers;

  if (!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');

  if (! (username === credentials.websiteUsername && password === credentials.websitePassword)) {
    return reject();
  }

  return next();
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/graphql', graphqlHTTP({
  schema: typeDefs,
  rootValue: resolvers,
  graphiql: true,
}));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port);
console.log('Running a GraphQL API server at http://localhost:' + port + '/graphql');
