import { PostgresProductRepository } from '@domain/repositories/implementations/PostgresProductRepository'
import { CreateProductController } from './CreateProductController'
import { CreateProductUseCase } from './CreateProductUseCase'

const postgresProductRepository = new PostgresProductRepository()

const createProductUseCase = new CreateProductUseCase(postgresProductRepository)

const createProductController = new CreateProductController(
  createProductUseCase
)

export { createProductController, createProductUseCase }
