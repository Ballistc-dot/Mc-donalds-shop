import { useSession } from 'next-auth/client'
import '../styles/globals.scss'
import isAuthenticateWithJwt from '../utils/isAuthenticateWithJwt'
import { AuthProvider } from '../contexts/AuthContext'
import { ApolloProvider } from '@apollo/client';
import client from '../utils/ApolloClient';
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </ApolloProvider>

  )
}

export default MyApp
