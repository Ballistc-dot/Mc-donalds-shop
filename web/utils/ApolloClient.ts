import { ApolloClient, InMemoryCache } from '@apollo/client'
import Cookies from 'js-cookie'

type Apollo = {
  token: string
}

export function CreateApolloClient(header?: Apollo) {
  const uri = process.env.GRAPHQL_URI || 'http://localhost:4000/graphql'
  if (header) {
    const token = header.token
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      headers: {
        authorization: `Bearer ${token}`,
      },
      uri,
      cache: new InMemoryCache(),
    })
  }
  const token = Cookies.get('token')
  return new ApolloClient({
    headers: {
      authorization: `Bearer ${token}`,
    },
    uri,
    cache: new InMemoryCache(),
  })
}
