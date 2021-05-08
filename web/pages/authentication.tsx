import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client'
import { gql, useMutation } from '@apollo/client';
// import { Container } from './styles';

const pages: React.FC = () => {
    /*const [session, loading] = useSession()
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
    }*/
    return <div />;
}

export default pages;