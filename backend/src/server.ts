import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import schema from './schema/index'

const server = new ApolloServer({
  schema, context: ({ req }) => {
    const context = {
      req,
    };
    return context;
  },
});
const app = express()
server.applyMiddleware({ app })

app.listen('4000')
/*server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});*/