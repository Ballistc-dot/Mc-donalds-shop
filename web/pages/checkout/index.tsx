import React, { useRef, useState } from 'react';
import Layout from '../../components/Layout';
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { gql, useQuery } from '@apollo/client'
import AddToCart from '../../store/modules/Cart/actions';
import useCart from '../../hooks/useCart';




const Checkout: React.FC = () => {
    const { addedIds,quantityById } = useCart()
    const inputRef = useRef<HTMLInputElement>()

    return (
        <Layout title="Checkout">
            <section className={styles.section}>
                <div className={styles.checkout}>
                    {<ul>
                        {addedIds && addedIds.map((v) => {
                            console.log("yes my friend")
                            const GET_PRODUCTS = gql`
                               query getProduct($id:Float!){
                                getProduct(id:$id){
                                   name
                                   image
                                   value
                                   }
                               }
                               `
                            const id = Number(v)

                            const { data } = useQuery(GET_PRODUCTS, {
                                variables: {
                                    id
                                }
                            })
                            const dispatch = useDispatch()
                            return (
                                <li key={id}>
                                    <img src={data?.getProduct?.image} alt="product image" />
                                    {id}:{quantityById[id]}
                                    <button onClick={() => {
                                        dispatch(AddToCart(id))
                                    }
                                        }>add</button>
                                    <input type="number" contentEditable={false} value={quantityById[id]} ref={inputRef} id="quantity" name="quantity" min="1" max="5" />
                                </li>)
                        })}
                    </ul>}
                </div>
            </section>
        </Layout>
    )
}

export default Checkout;