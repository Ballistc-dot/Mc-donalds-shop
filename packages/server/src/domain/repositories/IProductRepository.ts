import { Product } from '../entities/product'

export interface IProductRepository {
  save(product: Product): Promise<Product>
  findById(id: string): Promise<Product | undefined>
  delete(id: string): Promise<Product>
  update(id: string, Product: Product): Promise<Product>
  findByName(name: string): Promise<Product | undefined>
}
