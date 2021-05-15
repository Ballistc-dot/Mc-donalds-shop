import { ADD_TO_CART, DECREASE_ITEM_FROM_CART,REMOVE_TO_CART_ITEM,GET_PRODUCTS_FROM_CART } from '../types'

export function AddToCart(id) {

    return {
        type: ADD_TO_CART,
        id
    }
}
export function getProductsFromCart(){
    return {
        type: GET_PRODUCTS_FROM_CART
    }
}


export function RemoveToCart(id) {
    return {
        type: REMOVE_TO_CART_ITEM,
        id
    }
}
export function DeacreaseItemFromCart(id){
    return {
        type: DECREASE_ITEM_FROM_CART,
        id
    }
}