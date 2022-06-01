import { v4 } from 'uuid'

export class Product {
  public readonly id: string

  public name: string
  public image: string
  public price: number
  constructor(props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) this.id = v4()
  }
}
