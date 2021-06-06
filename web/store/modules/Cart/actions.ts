import {
  ADD_TO_CART,
  DECREASE_ITEM_FROM_CART,
  REMOVE_TO_CART_ITEM,
  GET_PRODUCTS_FROM_CART,
} from '../types'

export function addToCart(id: number) {
  return {
    type: ADD_TO_CART,
    id,
  }
}

export function getProductsFromCart() {
  return {
    type: GET_PRODUCTS_FROM_CART,
  }
}

export function removeToCart(id: number) {
  return {
    type: REMOVE_TO_CART_ITEM,
    id,
  }
}

export function deacreaseItemFromCart(id: number) {
  return {
    type: DECREASE_ITEM_FROM_CART,
    id,
  }
}
