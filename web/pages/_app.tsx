import '../styles/globals.scss'
import { AuthProvider } from '../contexts/AuthContext'
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'next-auth/client'
import { CreateApolloClient } from '../utils/ApolloClient';
import { Provider as ProviderRedux } from 'react-redux'
import {store, persistor } from '../store'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
  const client = CreateApolloClient()
  return (
    <ApolloProvider client={client}>
      <Provider>
        <ProviderRedux store={store}>
        <PersistGate persistor={persistor}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
        </ProviderRedux>
      </Provider>
    </ApolloProvider>

  )
}

export default MyApp
