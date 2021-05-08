import { createContext, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/client'
import Cookies from 'js-cookie'
import { gql, useMutation } from '@apollo/client'

interface AuthContextProps {
    logout(): void
}


export const AuthContext = createContext({} as AuthContextProps)



export const AuthProvider = ({ children }) => {
    const [session, loading] = useSession()
    async function logout() {
        Cookies.remove("token")

        signOut()
    }
    const token = Cookies.get("token")
    console.log(token)
    if (!token || token == 'undefined') {
        console.log("aa", token)

        const createUserToken = gql`
        mutation($email:String!){
          createUserToken(email:$email){
            user{
              email
              name
            }
            token
          }
        }
    `
        const [AddUserToken, { data }] = useMutation(createUserToken)

        if (session) {
            AddUserToken({ variables: { email: session?.user?.email } })

            const token = data?.createUserToken?.token

            Cookies.set("token", token)
        }
    }
    return (
        <AuthContext.Provider value={{
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

