import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/client'
import { AuthContext } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import { ShoppingCart, AccountCircle } from '@material-ui/icons'
import { CreateApolloClient } from '../../utils/ApolloClient'
import { gql } from '@apollo/client'

const Header: React.FC = () => {
  const [session] = useSession()
  const { logout } = useContext(AuthContext)
  const [isAccountBoxVisible, setIsAccountBoxVisible] = useState(false)
  const [userBallance, setUserBallance] = useState(0)
  const router = useRouter()
  const client = CreateApolloClient()

  const UserBallanceQuery = gql`
    query {
      getBallance {
        account_ballance
      }
    }
  `

  async function handleAccountClick() {
    setIsAccountBoxVisible(!isAccountBoxVisible)
    const response = await client.query({ query: UserBallanceQuery })
    setUserBallance(response.data.getBallance.account_ballance)
  }

  return (
    <header className={styles.header}>
      <Image
        className={styles.image}
        onClick={() => router.push('/')}
        src="/images/logo.png"
        width={62}
        height={48}
      />
      <nav className={styles.right_header}>
        <ul className={styles.list}>
          <li>
            <Link href="/">Home</Link>{' '}
          </li>
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        {session ? (
          <button onClick={() => logout()}>SIGNOUT</button>
        ) : (
          <button onClick={() => signIn('google')}>SIGNIN</button>
        )}
        <ShoppingCart
          className={styles.CartIcon}
          onClick={() => router.push('/cart')}
        />
        <div className={styles.AccountContainer}>
          <AccountCircle
            className={styles.AccountIcon}
            onClick={handleAccountClick}
          />
          <div
            className={styles.AccountBox}
            style={{ display: isAccountBoxVisible ? 'flex' : 'none' }}
          >
            <span>Account Balance: {userBallance}</span>
            <button onClick={() => router.push('/addbalance')}>
              Add Balance
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
