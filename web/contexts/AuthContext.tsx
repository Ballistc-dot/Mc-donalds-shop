import { createContext } from 'react'
import { signOut, useSession } from 'next-auth/client'
import Cookies from 'js-cookie'
import { gql, useMutation } from '@apollo/client'
import { CreateApolloClient } from '../utils/ApolloClient'

interface AuthContextProps {
    logout(): void
}


export const AuthContext = createContext({} as AuthContextProps)



export const AuthProvider = ({ children }) => {
    const [session] = useSession()
    // const client = CreateApolloClient()

    async function logout() {
        await Cookies.remove("token")

        signOut()
    }

    const token = Cookies.get("token")


    if (!token || token == 'undefined') {

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
        //client.mutate(mut)
        if (session) {
            AddUserToken({ variables: { email: session?.user?.email } })
            console.log(data)

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

