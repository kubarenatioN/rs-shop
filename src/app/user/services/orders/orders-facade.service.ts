import { Injectable } from '@angular/core'
import { ProductsFacadeService } from 'src/app/category-page/services/products/products-facade.service'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { IOrder } from 'src/app/shared/models/order-item.model'
import { OrdersHttpService } from './orders-http.service'
import { OrdersStoreService } from './orders-store.service'

@Injectable({
  providedIn: 'root'
})
export class OrdersFacadeService {
  orders$ = this.store.orders$

  orderProducts$ = this.store.orderProducts$

  constructor(
    private http: OrdersHttpService,
    private store: OrdersStoreService,
    private auth: AuthService,
    private productsFacade: ProductsFacadeService
  ) {
    auth.user$.subscribe(user => {
      if (user !== null) {
        console.log(user.orders)
        this.store.setOrders(user.orders)
      } else {
        this.store.setOrders([])
      }
    })
  }

  makeOrder(order: IOrder): void {
    this.http.makeOrder(order).subscribe(() => {
      this.auth.getUserInfo()
    })
  }

  getOrderById(id: string): IOrder | null {
    const order = this.store.getOrderById(id) ?? null
    if (order === null) return null
    this.getOrderProducts(order?.items.map(it => it.id))
    return order
  }

  getOrderProducts(ids: string[]): void {
    this.productsFacade.getProductsById(ids).subscribe(products => {
      this.store.setOrderProducts(products)
    })
  }

  clearProducts(): void {
    this.store.setOrderProducts([])
  }

  removeOrder(id: string): void {
    this.http.removeOrder(id).subscribe(() => {
      console.log('remove')
      this.auth.getUserInfo()
    })
  }

  editOrder(newOrder: IOrder): void {
    this.http.updateOrder(newOrder).subscribe(res => {
      console.log('put http', res)
      this.auth.getUserInfo()
    })
  }
}
