import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import {
  IOrder,
  IOrderDetails,
  IOrderItem
} from 'src/app/shared/models/order-item.model'
import { IProduct } from 'src/app/shared/models/product.model'
import { OrdersFacadeService } from '../../services/orders/orders-facade.service'

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  products: IProduct[] = []

  headingTitle = 'Редактирование заказа'

  size = 0

  order: IOrder | null = null

  orderItemsIds: string[] = []

  orderItems: IOrderItem[] = []

  summaryPrice = 0

  constructor(
    private ordersFacade: OrdersFacadeService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id === null) {
      this.order = null
    } else {
      this.order = this.ordersFacade.getOrderById(id)
    }
    this.ordersFacade.orderProducts$.subscribe(products => {
      this.products = products
      this.size = products.length
      this.countSummaryPrice()
    })
    this.orderItems = this.order?.items ?? []
    this.orderItemsIds = this.order?.items.map(it => it.id) ?? []
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

  updateOrderItems(): void {
    this.orderItems = this.orderItems.filter(it =>
      this.products.map(p => p.id).includes(it.id)
    )
    this.orderItemsIds = this.orderItemsIds.filter(id =>
      this.products.map(p => p.id).includes(id)
    )
    this.countSummaryPrice()
  }

  checkAmounts(): boolean {
    const isEnabled =
      this.orderItems.every(it => it.amount > 0) &&
      this.orderItems.length === this.size
    return isEnabled
  }

  getItemsWithAmount(): IOrderItem[] {
    return this.orderItems.filter(it => it.amount > 0)
  }

  submitEditOrder(newOrderDetails: IOrderDetails): void {
    const newOrder: IOrder = {
      id: this.order?.id,
      items: this.orderItems,
      details: newOrderDetails
    }
    this.ordersFacade.editOrder(newOrder)
    this.snackBar.open('Ваш заказ успешно изменен', 'OK', {
      duration: 3000
    })
  }

  removeItemFromList(id: string): void {
    this.products = this.products.filter(p => p.id !== id)
    this.size = this.products.length
    this.updateOrderItems()
  }

  getProductAmount(id: string): number {
    const product = this.order?.items.find(it => it.id === id)
    return product?.amount ?? 0
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
