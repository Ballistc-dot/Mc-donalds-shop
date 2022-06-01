import { Product } from 'core/entities/Product'
import { CreateProductUseCase } from './CreateProductUseCase'

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async execute(data: any): Promise<Product> {
    return await this.createProductUseCase.handle(data)
  }
}
