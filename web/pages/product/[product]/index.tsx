import { gql } from '@apollo/client';
import client from '../../../utils/ApolloClient'
import React from 'react';
import Layout from '../../../components/Layout';

import styles from './styles.module.scss'

interface ProductProps {
    product: {
        id: number
        name: string
        value: number
        image: string
    }
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <Layout title={`${product.name.toLocaleUpperCase()}`}>
            <section className={styles.section}>
                <div className={styles.product}>
                    <img src={product.image} alt="" />
                    <div className={styles.product_info}>
                        <h1>{product.name}</h1>
                        <h3>{product.value}</h3>
                    </div>
                    <button>ORDER</button>
                </div>
            </section>
        </Layout>
    );
}
export async function getServerSideProps(context) {
    const { product: id } = context.query

    const query = gql`
        query($id:Float!){
         getProduct(id:$id){

            id
           name
           value 
           image

            
          }
        }
      `
    const { data } = await client.query({
        query,
        variables: {
            id: Number(id)
        }
    })
    const product = data.getProduct
    return {
        props: {
            product
        }
    }
}
export default Product;