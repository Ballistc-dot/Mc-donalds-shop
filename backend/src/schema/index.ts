import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import ProductControllers from '../controllers/ProductController'
import UserController from '../controllers/UserController'

const schema = buildSchemaSync({
  resolvers: [ProductControllers, UserController],
});

export default schema