import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { gql } from '@apollo/client'
import { CreateApolloClient } from '../../../utils/ApolloClient'
import Cookies from 'cookies'

export default (req, res) =>
  NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      // ...add more providers here
    ],
    events: {
      async signIn(message) {
        const cookies = new Cookies(req, res)

        const token = `${message.account.accessToken}`
        const email = `${message.user.email}`
        //console.log(message.account)
        const client = CreateApolloClient({ token })

        const createUser = gql`
          mutation {
            createUser {
              token
            }
          }
        `
        const response = await client.mutate({
          mutation: createUser,
        })
        console.log(response)
        cookies.set('token', response.data?.createUser.token, {
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
      },
      async signOut(message) {
        /* on signout */
      },
      async createUser(message) {
        const cookies = new Cookies(req, res)

        const token = `${message.account.idToken}`
        const name = `${message.user.name}`
        const email = `${message.user.email}`
        const client = CreateApolloClient()
        console.log('message.account')
        // Get a cookie
        //cookies.get('myCookieName')
        // Set a cookie
        /*cookies.set('accessToken', token, {
          httpOnly: false, // true by default
        })*/

        //  (res)
        // (message)

        const mutation = gql`
          mutation ($name: String!, $email: String!, $googleToken: String!) {
            createUser(name: $name, email: $email, googleToken: $googleToken) {
              user {
                email
              }
              token
            }
          }
        `
        client.mutate({
          mutation: mutation,
          variables: {
            name,
            email,
            googleToken: token,
          },
        })
      },
      async linkAccount(message) {
        /* account linked to a user */
      },
      async session(message) {
        /* session is active */
      },
      async error(message) {
        /* error in authentication flow */
      },
    },
    /*session: {
      jwt: true,
      maxAge: 100000,
    },
    jwt: {
      secret: process.env.JWT_SIGNING_PRIVATE_KEY,
    },*/

    // A database is optional, but required to persist accounts in a database
    //database: process.env.DATABASE_URL,
  })
