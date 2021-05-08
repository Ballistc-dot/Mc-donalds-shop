import React from 'react';
import Image from 'next/image'
import styles from './styles.module.scss'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client';

const Header: React.FC = () => {
    const [session] = useSession()
    return (
        <header className={styles.header}>
            <Image src="/images/logo.png" width={62}
                height={48} />
            <div className={styles.right_header}>

                <ul className={styles.list}>
                    <li><Link href="/">Home</Link> </li>
                    <li><Link href="/menu">Menu</Link></li>
                    <li><Link href="/about">About us</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
                {
                    session ?
                        <button onClick={() => signOut()}>SIGNOUT</button>
                        :
                        <button onClick={() => signIn('google')}>SIGNIN</button>
                }

            </div>
        </header >
    )
}

export default Header;