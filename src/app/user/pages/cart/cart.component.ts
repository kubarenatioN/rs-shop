import { Component, OnInit } from '@angular/core'
import { UserGoodsFacadeService } from 'src/app/core/services/user-goods/user-goods-facade.service'
import {
  IOrder,
  IOrderDetails,
  IOrderItem
} from 'src/app/shared/models/order-item.model'
import { IProduct } from 'src/app/shared/models/product.model'
import { OrdersFacadeService } from '../../services/orders/orders-facade.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // private isOrderFormActive$$ = new BehaviorSubject<boolean>(false)

  // isOrderFormActive$ = this.isOrderFormActive$$.asObservable()

  isOrderFormActive = false

  headingTitle = 'Корзина'

  products: IProduct[] = []

  size = 0

  orderItemsIds: string[] = []

  orderItems: IOrderItem[] = []

  constructor(
    private userGoodsFacade: UserGoodsFacadeService,
    private ordersFacade: OrdersFacadeService
  ) {}

  ngOnInit(): void {
    this.userGoodsFacade.cartProducts$.subscribe(p => {
      this.products = p
      this.size = p.length
      console.log('refresh?', this.products)
      this.updateCartItems()
    })
  }

  onItemChanged(item: IOrderItem): void {
    if (!this.orderItemsIds.includes(item.id)) {
      this.orderItems.push(item)
      this.orderItemsIds.push(item.id)
    } else {
      const ind = this.orderItems.findIndex(it => it.id === item.id)
      this.orderItems[ind].amount = item.amount
    }
    console.log('item changed:', this.orderItems)
  }

  updateCartItems(): void {
    this.orderItems = this.orderItems.filter(it =>
      this.products.map(p => p.id).includes(it.id)
    )
    this.orderItemsIds = this.orderItemsIds.filter(id =>
      this.products.map(p => p.id).includes(id)
    )
    console.log(this.orderItems, this.orderItemsIds)
  }

  checkAmounts(): boolean {
    const isEnabled =
      this.orderItems.every(it => it.amount > 0) &&
      this.orderItems.length === this.size
    return isEnabled
  }

  makeOrder(): void {
    // this.isOrderFormActive$$.next(true)
    this.isOrderFormActive = true
  }

  cancelOrder(): void {
    // this.isOrderFormActive$$.next(false)
    this.isOrderFormActive = false
  }

  submitOrder(details: IOrderDetails): void {
    const order: IOrder = {
      items: this.orderItems,
      details
    }
    this.ordersFacade.makeOrder(order)
  }

  getItemAmount(id: string): number {
    return this.orderItems.find(it => it.id === id)?.amount ?? 0
  }
}
