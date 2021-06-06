import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { KeyboardArrowDown, KeyboardArrowUp, Close } from '@material-ui/icons'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import styles from './styles.module.scss'
import {
  addToCart,
  deacreaseItemFromCart,
  getProductsFromCart,
  removeToCart,
} from '../../store/modules/Cart/actions'
import useCart from '../../hooks/useCart'
import ReactLoading from 'react-loading'

const Checkout: React.FC = () => {
  const { addedIds, quantityById, addProduct, loading } = useCart()
  const inputRef = useRef<HTMLInputElement>()
  const dispatch = useDispatch()
  const router = useRouter()
  const [qnty, setQnty] = useState(quantityById)
  const [products, setProducts] = useState(addProduct)
  useEffect(() => {
    dispatch(getProductsFromCart())
    setProducts(addProduct)
  }, [addedIds, quantityById])

  function handleChange(change, id) {
    switch (change) {
      case 'add_to_cart':
        dispatch(addToCart(id))
        setQnty(qnty[id] + 1)
        break
      case 'remove_to_cart':
        dispatch(removeToCart(id))
        break
      case 'decrease_to_cart':
        if (quantityById[id] > 0) {
          dispatch(deacreaseItemFromCart(id))
        } else {
          dispatch(removeToCart(id))
        }
        break
    }
  }

  return (
    <Layout title="Checkout">
      <section className={styles.section}>
        <div className={styles.checkout}>
          <ul>
            {addProduct.map((v) => {
              const id = Number(v.id)

              return (
                <li className={styles.item} key={id}>
                  <img src={v.image} alt="product" />
                  <div className={styles.product_info}>
                    <span>{v.name}</span>
                    <span>${v.value}</span>
                  </div>
                  <div className={styles.checkout_buttons}>
                    <input
                      type="number"
                      contentEditable={false}
                      ref={inputRef}
                      defaultValue={quantityById[v.id]}
                      //id="quantity"
                      //name="quantity"
                    />
                    <div className={styles.checkout_buttons_updown}>
                      <button
                        type="button"
                        onClick={() => handleChange('add_to_cart', id)}
                      >
                        <KeyboardArrowUp className={styles.icon} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange('decrease_to_cart', id)}
                      >
                        <KeyboardArrowDown className={styles.icon} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleChange('remove_to_cart', id)}
                    >
                      <Close className={styles.icon} />
                    </button>
                  </div>
                </li>
              )
            })}
            {/*loading && <ReactLoading type="spinningBubbles" color="#000" />*/}
            {addProduct.length > 0 && (
              <div className={styles.finish_checkout}>
                <button type="button" onClick={() => router.push('/menu')}>
                  Continue buying
                </button>
                <button type="button" className={styles.checkout_button}>
                  Checkout
                </button>
              </div>
            )}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default Checkout
