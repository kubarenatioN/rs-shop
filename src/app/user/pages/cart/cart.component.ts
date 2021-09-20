import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
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
  isOrderFormActive = false

  headingTitle = 'Корзина'

  products: IProduct[] = []

  size = 0

  orderItemsIds: string[] = []

  orderItems: IOrderItem[] = []

  summaryPrice = 0

  constructor(
    private userGoodsFacade: UserGoodsFacadeService,
    private ordersFacade: OrdersFacadeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userGoodsFacade.cartProducts$.subscribe(p => {
      this.products = p
      this.size = p.length
      this.updateCartItems()
      this.countSummaryPrice()
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
    this.countSummaryPrice()
  }

  updateCartItems(): void {
    this.orderItems = this.orderItems.filter(it =>
      this.products.map(p => p.id).includes(it.id)
    )
    this.orderItemsIds = this.orderItemsIds.filter(id =>
      this.products.map(p => p.id).includes(id)
    )
  }

  checkAmounts(): boolean {
    const isEnabled =
      this.orderItems.every(it => it.amount > 0) &&
      this.orderItems.length === this.size
    return isEnabled
  }

  makeOrder(): void {
    this.isOrderFormActive = true
  }

  cancelOrder(): void {
    this.isOrderFormActive = false
  }

  submitOrder(details: IOrderDetails): void {
    const order: IOrder = {
      items: this.orderItems,
      details
    }
    this.ordersFacade.makeOrder(order)
    this.snackBar.open('Ваш заказ был успешно создан', 'OK', {
      duration: 3000
    })
  }

  getItemAmount(id: string): number {
    return this.orderItems.find(it => it.id === id)?.amount ?? 0
  }

  countSummaryPrice(): void {
    this.summaryPrice = this.orderItems.reduce(
      (acc, item) =>
        acc +
        (this.products.find(p => p.id === item.id)?.price || 0) * item.amount,
      0
    )
  }
}
