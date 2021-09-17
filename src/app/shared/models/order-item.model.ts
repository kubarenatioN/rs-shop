export interface IOrder {
  id?: string
  items: IOrderItem[]
  details: IOrderDetails
}

export interface IOrderItem {
  id: string
  amount: number
}

export interface IOrderDetails {
  name: string
  address: string
  phone: string
  timeToDeliver: string
  comment: string
}
