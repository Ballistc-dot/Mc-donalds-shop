import 'reflect-metadata'
import { buildSchemaSync } from 'type-graphql'
import BallanceController from '../controllers/BallanceController'
import ProductControllers from '../controllers/ProductController'
import UserController from '../controllers/UserController'

const schema = buildSchemaSync({
  resolvers: [ProductControllers, UserController, BallanceController],
})

export default schema
