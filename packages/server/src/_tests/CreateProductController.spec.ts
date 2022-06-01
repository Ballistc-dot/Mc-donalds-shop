import { createProductController } from '@domain/useCases/createProduct'
import { Product } from 'core/entities/Product'

describe('Create product controller', () => {
  it('Should create a new product', async () => {
    const inputData: Omit<Product, 'id'> = {
      name: 'Big Mc 2',
      image: 'sla.afd,afa/png',
      price: 19.99
    }
    const response = await createProductController.execute(inputData)

    expect(response.name).toBe(inputData.name)
  })
  it('Should create a new product and return an error', async () => {
    try {
      const inputData: Omit<Product, 'id'> = {
        name: 'Big Mc',
        image: 'sla.afd,afa/png',
        price: 19.99
      }
      await createProductController.execute(inputData)
    } catch (error: any) {
      expect(error.message).toBe(
        'A product with this name already exists, try to edit it'
      )
    }
  })
})
