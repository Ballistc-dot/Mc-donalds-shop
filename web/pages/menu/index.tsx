import React from 'react'
import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { CreateApolloClient } from '../../utils/ApolloClient'
import styles from './styles.module.scss'

interface MenuProps {
  products: [
    {
      id: number
      name: string
      value: number
      image: string
    }
  ]
}

const Menu: React.FC<MenuProps> = ({ products }) => {
  const router = useRouter()
  return (
    <Layout title="Menu">
      <section className={styles.section}>
        <div>
          <ul className={styles.products}>
            {products.map((v, i) => (
              <li key={i} onClick={() => router.push(`/product/${v.id}`)}>
                <img src={v.image} />
                <div className={styles.description}>
                  <h2>{v.name}</h2>
                  <h3>${v.value}</h3>
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
  const client = CreateApolloClient(context.req.cookies)

  const query = gql`
    query products {
      products {
        id
        name
        value
        image
      }
    }
  `

  const { data } = await client.query({ query })

  const { products } = data

  return {
    props: {
      products,
    },
  }
}

export default Menu
