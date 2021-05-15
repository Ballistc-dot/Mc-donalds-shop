import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import styles from './styles.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { gql, useQuery } from '@apollo/client'
import {AddToCart, DeacreaseItemFromCart,getProductsFromCart, RemoveToCart} from '../../store/modules/Cart/actions';
import useCart from '../../hooks/useCart';

interface RequestProps{
    getProduct:{
        id:number
        value:number
        name:number
        image: string
    }
}


const Checkout: React.FC = () => {
    const { addedIds,quantityById, addProduct } =  useCart()
    const inputRef = useRef<HTMLInputElement>()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProductsFromCart())
    },[addedIds,quantityById])
    return (
        <Layout title="Checkout">
            <section className={styles.section}>
                <div className={styles.checkout}>
                    {<ul>
                        {addProduct && addProduct.map((v) => {
                            const id = Number(v.id)
                    
                            
                            return (
                                <li className={styles.item} key={1}>
                                    <img src={v.image} alt="product image" />
                                    <span>{v.name}</span>
                                    <span>{v.value}</span>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        if(quantityById[id] > 0){
                                            dispatch(DeacreaseItemFromCart(id))

                                        }else{
                                            dispatch(RemoveToCart(id))
                                        }
                                    }
                                        }>add</button>
                                    <input type="number" contentEditable={false} value={quantityById[v.id]} ref={inputRef} id="quantity" name="quantity" min="1" max="5" />
                                </li>
                        )})}
                    </ul>}
                </div>
            </section>
        </Layout>
    )
}

export default Checkout;