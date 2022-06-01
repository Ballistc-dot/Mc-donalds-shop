import { Product } from '@domain/entities/product'
import { IProductRepository } from '@domain/repositories/IProductRepository'
import { CreateProductDTO } from './CreateProductDTO'

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async handle(data: CreateProductDTO): Promise<Product> {
    const productAlreadyExists = await this.productRepository.findByName(
      data.name
    )
    if (productAlreadyExists) {
      throw new Error('A product with this name already exists, try to edit it')
    }
    const product = await this.productRepository.save(data)
    return product
  }
}
