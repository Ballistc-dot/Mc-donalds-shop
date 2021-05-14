import { ADD_TO_CART } from '../types'

export default function AddToCart(id) {
    console.log(id)
    return {
        type: ADD_TO_CART,
        id
    }
}