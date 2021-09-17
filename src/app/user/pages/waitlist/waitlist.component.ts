import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { IOrder } from 'src/app/shared/models/order-item.model'
import { OrdersFacadeService } from '../../services/orders/orders-facade.service'

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss']
})
export class WaitlistComponent {
  headingTitle = 'Лист ожидания'

  products$ = this.ordersFacade.orderProducts$

  orders$ = this.ordersFacade.orders$

  getAmount(order: IOrder, id: string): number {
    return order.items.find(it => it.id === id)?.amount ?? 0
  }

  constructor(
    private ordersFacade: OrdersFacadeService,
    private router: Router
  ) {}

  editItem(id: string): void {
    this.router.navigate(['/edit-order', id])
  }

  loadProducts(order: IOrder): void {
    this.ordersFacade.getOrderProducts(order.items.map(it => it.id))
  }

  clearProducts(): void {
    this.ordersFacade.clearProducts()
  }

  deleteItem(id: string): void {
    this.ordersFacade.removeOrder(id)
  }
}
