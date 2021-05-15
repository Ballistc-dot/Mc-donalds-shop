import {CreateApolloClient} from '../../../utils/ApolloClient'
import {call,all, put, takeLatest, select} from 'redux-saga/effects'
import {GET_PRODUCTS_FROM_CART,SET_PRODUCTS} from '../types'
import { gql } from '@apollo/client'


async function getProductsInfo(id){
    const GET_PRODUCTS = gql`
            query getProduct($id:Float!){
                getProduct(id:$id){
                    id
                    name
                    image
                    value
                    }
            }
            `
            const client = CreateApolloClient()
            var all = []
            
            for(let i=0;i < id.length;i++){
                const {data} = await client.query({query:GET_PRODUCTS,
                variables:{
                    id:id[i]
                }})
                all.push(data.getProduct)
            }
            
            return all

}

function* getProducts(){
    const state = yield select();

    let products = yield call(getProductsInfo,state.addedIds)
    yield put({
        type:SET_PRODUCTS,
        payload:products
    })
}


export default function* rootSaga(){
    return yield all([
        yield takeLatest(GET_PRODUCTS_FROM_CART, getProducts)
    ])
}