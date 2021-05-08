import React from 'react';
import Head from 'next/head'
import Header from '../Header'

interface LayoutProps {
    title: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            {children}
        </>
    )
}

export default Layout;