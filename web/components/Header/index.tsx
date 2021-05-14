import React, { useContext } from 'react';
import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/client';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';


const Header: React.FC = () => {
    const [session] = useSession()
    const { logout } = useContext(AuthContext)
    const router = useRouter()
    return (
        <header className={styles.header}>
            <Image
                className={styles.image}
                onClick={() => router.push('/')}
                src="/images/logo.png" width={62}
                height={48} />
            <nav className={styles.right_header}>

                <ul className={styles.list}>
                    <li><Link href="/">Home</Link> </li>
                    <li><Link href="/menu">Menu</Link></li>
                    <li><Link href="/about">About us</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
                {
                    session ?
                        <button onClick={() => logout()}>SIGNOUT</button>
                        :
                        <button onClick={() => signIn('google')}>SIGNIN</button>
                }
            </nav>
        </header >
    )
}

export default Header;