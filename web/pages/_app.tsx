import '../styles/globals.scss'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'next-auth/client'
import { Provider as ProviderRedux } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import { store, persistor } from '../store'
import { CreateApolloClient } from '../utils/ApolloClient'
import { AuthProvider } from '../contexts/AuthContext'

const progress = new ProgressBar({
  size: 3,
  color: '#f5c203',
  className: 'bar-of-progress',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

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
