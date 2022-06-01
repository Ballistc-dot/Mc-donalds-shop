import 'reflect-metadata'

import path from 'path'

import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './core/resolvers/UserResolver'

async function main() {
  try {
    const schema = await buildSchema({
      resolvers: [UserResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.gql')
    })
    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        const context = {
          req
        }
        return context
      }
    })

    const { url } = await server.listen()

    console.log(`Server is running on ${url}`)
  } catch (err) {
    console.log(err)
  }
}
main()
