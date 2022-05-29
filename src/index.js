import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import path from 'path';
import { resolvers } from './resolvers';
import { typeDefs } from './types';


const app = express();
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../rfb2-client-app/build')));

app.use('/graphql', graphqlHTTP({
  schema: typeDefs,
  rootValue: resolvers,
  graphiql: true,
}));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../rfb2-client-app/build', 'index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port);
console.log('Running a GraphQL API server at http://localhost:' + port + '/graphql');
