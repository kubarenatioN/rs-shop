export interface IUserInfo {
  firstName: string
  lastName: string
  cart: string[]
  favorites: string[]
  orders: IOrder[]
}

interface IOrder {
  id: string
  items: IOrderItem[]
  details: IOrderDetails[]
}

interface IOrderItem {
  id: string
  amount: number
}

interface IOrderDetails {
  name: string
  address: string
  phone: string
  timeToDeliver: string
  comment: string
}
