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

export async function getStaticProps() {
  /*const client = CreateApolloClient()

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

  //const { products } = data*/
  const products = [
    {
      id: '2ewsadasd1',
      name: 'Double Quarter',
      value: 12,
      image:
        'https://res.cloudinary.com/dxrkqzroc/image/upload/v1620441797/duplo-quarterao-new_xveuvi.png',
    },
    {
      id: '2ewsadasd2',
      name: 'Big mac',
      value: 19,
      image:
        'https://res.cloudinary.com/dxrkqzroc/image/upload/v1620439855/bigmac_v2_ufqvnd.png',
    },
    {
      id: '2ewsadasd3',
      name: 'Quarter',
      value: 9,
      image:
        'https://res.cloudinary.com/dxrkqzroc/image/upload/v1620439724/quarteirao_sjgfk7.png',
    },
  ]
  return {
    props: {
      products,
    },
  }
}

export default Menu
