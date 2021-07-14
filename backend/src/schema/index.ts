import 'reflect-metadata'
import { buildSchemaSync } from 'type-graphql'
import AddressController from '../controllers/AddressController'
import BallanceController from '../controllers/BallanceController'
import CheckoutController from '../controllers/CheckoutController'
import ProductControllers from '../controllers/ProductController'
import UserController from '../controllers/UserController'

const schema = buildSchemaSync({
  resolvers: [
    ProductControllers,
    UserController,
    BallanceController,
    CheckoutController,
    AddressController,
  ],
})

export default schema
