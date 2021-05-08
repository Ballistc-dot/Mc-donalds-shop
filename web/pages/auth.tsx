import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'
import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'

export default function Home() {
  const [session, loading] = useSession()
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
  useEffect(() => {
    async function GetToken() {
      const email = session?.user?.email
      if (email) {
        console.log(email)
        await AddUserToken({ variables: { email } })

        console.log(data)
      }
    } GetToken()


  }, [session, loading])
  return (
    <div className={styles.container}>
      {session &&
        <h1>welcome {session.user?.name}</h1>
      }
      <button onClick={() => signIn('github')}>Sign in</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
