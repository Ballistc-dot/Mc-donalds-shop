import { useSelector } from 'react-redux'

interface CartProps {
  addedIds: [number]
  quantityById: {
    id: number
  }
  addProduct: [
    {
      id: number
      name: string
      value: number
      image: string
    }
  ]
  loading: boolean
}

export default function useCart() {
  return useSelector((state: CartProps) => state)
}
