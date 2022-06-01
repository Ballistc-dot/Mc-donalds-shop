import { Product } from '@domain/entities/product'
import { IProductRepository } from '../IProductRepository'

export class PostgresProductRepository implements IProductRepository {
  private products: Product[] = [
    {
      id: 'ery8ugsfhdyuhrwa8931io',
      image: 'ew78rfys87gvy../com/jn.png',
      name: 'Big Mc',
      price: 69
    }
  ]

  async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.id === id)

    return product
  }

  async save(product: Product): Promise<Product> {
    this.products.push(product)
    console.log(`[Product-Repository Save] ${this.products}`)
    return product
  }

  async update(id: string, product: Product): Promise<Product> {
    const oldedProduct = this.products.findIndex(product => product.id === id)

    this.products[oldedProduct].image = product.image
    this.products[oldedProduct].name = product.name
    this.products[oldedProduct].price = product.price
    console.log(`[Product-Repository Update] ${this.products}`)
    return this.products[oldedProduct]
  }
  async delete(id: string): Promise<Product> {
    const toDeletedProduct = this.products.findIndex(
      product => product.id === id
    )

    this.products.splice(toDeletedProduct, 1)
    console.log(`[Product-Repository Delete] ${this.products}`)
    return new Product({
      name: 'teset',
      image: 'sela.com/image.png',
      price: 12.99
    })
  }
  async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(product => product.name === name)
    return product
  }
}
