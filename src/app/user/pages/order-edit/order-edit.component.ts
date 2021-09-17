import { Component, OnInit } from '@angular/core'
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

  size = 0

  order: IOrder | null = null

  orderItemsIds: string[] = []

  orderItems: IOrderItem[] = []

  constructor(
    private ordersFacade: OrdersFacadeService,
    private route: ActivatedRoute
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
  }

  checkAmounts(): boolean {
    const isEnabled =
      this.orderItems.every(it => it.amount > 0) &&
      this.orderItems.length === this.size
    // console.log(isEnabled)
    return isEnabled
  }

  getItemsWithAmount(): IOrderItem[] {
    return this.orderItems.filter(it => it.amount > 0)
  }

  submitEditOrder(newOrderDetails: IOrderDetails): void {
    // console.log('new order: ', newOrderDetails, this.orderItems, this.order?.id)
    const newOrder: IOrder = {
      id: this.order?.id,
      items: this.orderItems,
      details: newOrderDetails
    }
    this.ordersFacade.editOrder(newOrder)
  }

  removeItemFromList(id: string): void {
    this.orderItemsIds = this.orderItemsIds.filter(it => it !== id)
    this.orderItems = this.orderItems.filter(it => it.id !== id)
  }

  getProductAmount(id: string): number {
    const product = this.order?.items.find(it => it.id === id)
    return product?.amount ?? 0
  }
}
