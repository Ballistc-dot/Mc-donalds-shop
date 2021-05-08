import React from 'react';
import Layout from '../../components/Layout';
import client from '../../utils/ApolloClient'
import { gql } from '@apollo/client'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

interface MenuProps {
    products: [{
        id: number
        name: string,
        value: number,
        image: string
    }]
}


const Menu: React.FC<MenuProps> = ({ products }) => {
    const router = useRouter()
    return (
        <Layout title="Menu">
            <section className={styles.section}>
                <div>
                    <ul className={styles.products}>
                        {products.map((v, i) => (
                            <li onClick={() => router.push(`/product/${v.id}`)}>
                                <img src={v.image} />
                                <div className={styles.description}>
                                    <h2>{v.name}</h2>
                                    <h3>{v.value}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </Layout>
    )
}
export async function getServerSideProps(context) {
    const query = gql`
    query products{
        products{
            id
            name
            value
            image
        }

    }
    `
    const { data } = await client.query({ query })
    console.log(data)
    return {
        props: {
            products: data.products
        }, // will be passed to the page component as props
    }
}

export default Menu;