import { CHECKOUT_REQUEST, CHECKOUT_FAILURE, ADD_TO_CART } from '../types'

const initialState = {
    addedIds: [],
    quantityById: {

    }
}


const quantityById = (state = initialState.quantityById, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.log(state)
            const { id } = action
            return {
                ...state,
                [id]: (state[id] || 0) + 1
            }
        default:
            return state
    }
}

const addIds = (state = initialState.addedIds, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.log('here')
            if (state.indexOf(action.id) !== -1) {
                return state
            }
            if (state.includes(action.id)) {
                return state
            }
            return [...state, action.id]
        case 'REMOVE_TO_CART':
            const index = state.indexOf(Number(action.id))

            if (index > -1) {
                state.splice(index, 1)
                return state
            }
            if (!state.includes(action.id)) {
                return state
            }
        default:
            return state
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return state
        case CHECKOUT_FAILURE:
            return action.cart
        default:
            return {
                addedIds: addIds(state.addedIds, action),
                quantityById: quantityById(state.quantityById, action)
            }
    }
}

