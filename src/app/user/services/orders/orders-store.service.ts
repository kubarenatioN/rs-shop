import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IOrder } from 'src/app/shared/models/order-item.model'
import { IProduct } from 'src/app/shared/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class OrdersStoreService {
  private orders$$ = new BehaviorSubject<IOrder[]>([])

  private orderProducts$$ = new BehaviorSubject<IProduct[]>([])

  orders$ = this.orders$$.asObservable()

  orderProducts$ = this.orderProducts$$.asObservable()

  getOrderById(id: string): IOrder | undefined {
    return this.orders$$.value.find(o => o.id === id)
  }

  setOrders(orders: IOrder[]): void {
    this.orders$$.next(orders)
  }

  setOrderProducts(products: IProduct[]): void {
    console.log('store: ', products)
    this.orderProducts$$.next(products)
  }
}
