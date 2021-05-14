import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import client from '../../../utils/ApolloClient'
import { gql } from '@apollo/client';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // ...add more providers here
  ],
  events: {
    async signIn(message) {
      //const client = CreateApolloClient()

      const token = `${message.account.idToken}`
      const name = `${message.user.name}`
      const email = `${message.user.email}`

      const mutation = gql`
        mutation($name:String!,$email:String!,$googleToken:String!){
          createUser(name:$name email:$email googleToken:$googleToken){
              email
          }
        }
      `
      client.mutate({
        mutation: mutation,
        variables: {
          name,
          email,
          googleToken: token
        }
      })
    },
    async signOut(message) { /* on signout */ },
    async createUser(message) { console.log("create") },
    async linkAccount(message) { /* account linked to a user */ },
    async session(message) { /* session is active */ },
    async error(message) { /* error in authentication flow */ }
  },
  session: {
    jwt: true,
    maxAge: 100000,
  },
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY,

  }

  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
})