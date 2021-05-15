import { CHECKOUT_REQUEST, CHECKOUT_FAILURE, ADD_TO_CART, DECREASE_ITEM_FROM_CART,REMOVE_TO_CART_ITEM, SET_PRODUCTS } from '../types'

const initialState = {
    addedIds: [],
    quantityById: {

    },
    products:[]
}


const quantityById = (state = initialState.quantityById, action) => {
    const { id } = action
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                [id]: (state[id] || 0) + 1
            }
        case  DECREASE_ITEM_FROM_CART:
            if(state[id] <= 0){
                return state
            }
            return {
                ...state,
                [id]: (state[id] || 0) - 1
            }
        default:
            return state
    }
}
const addProduct = (state = initialState.products,action) =>{
    switch(action.type){
        case SET_PRODUCTS:
            return action.payload
        default:
            return state
    }
}
const addIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (state.indexOf(action.id) !== -1) {
                return state
            }
            if (state.includes(action.id)) {
                return state
            }
            return [...state, action.id]
        case REMOVE_TO_CART_ITEM:
            const index = state.indexOf(Number(action.id))

            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
              ]
        default:
            return state
    }
}

export default function CartReducer(state = initialState, action) {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return state
        case CHECKOUT_FAILURE:
            return action.cart
        default:
            return {
                addedIds: addIds(state.addedIds, action),
                quantityById: quantityById(state.quantityById, action),
                addProduct:addProduct(state.products,action)
            }
    }
}

