import { createContext } from 'react'
import { getSession, signOut, useSession } from 'next-auth/client'
import Cookies from 'js-cookie'
import { gql, useMutation } from '@apollo/client'
import { CreateApolloClient } from '../utils/ApolloClient'
import cookieCutter from 'cookie-cutter'
interface AuthContextProps {
  logout(): void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }) => {
  // const client = CreateApolloClient()
  const [session] = useSession()

  async function logout() {
    await Cookies.remove('token')

    signOut()
  }

  
  return (
    <AuthContext.Provider
      value={{
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
