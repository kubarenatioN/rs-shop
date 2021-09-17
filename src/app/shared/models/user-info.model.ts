import { IOrder } from './order-item.model';

export interface IUserInfo {
  firstName: string
  lastName: string
  cart: string[]
  favorites: string[]
  orders: IOrder[]
}
