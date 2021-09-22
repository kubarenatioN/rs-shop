import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { UserGoodsFacadeService } from 'src/app/core/services/user-goods/user-goods-facade.service'
import { IOrderItem } from 'src/app/shared/models/order-item.model'
import { IProduct } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements AfterContentInit {
  @Input() product!: IProduct

  price?: number

  @Input() amount = 0

  @Output() itemChanged = new EventEmitter<IOrderItem>()

  constructor(private userGoodsFacade: UserGoodsFacadeService) {}

  ngAfterContentInit(): void {
    this.price = this.product.price * this.amount
  }

  recalculatePrice(): void {
    this.price = this.amount * this.product.price
    this.itemChanged.emit({
      id: this.product.id,
      amount: this.amount
    })
  }

  removeFromCart(): void {
    this.userGoodsFacade.removeFromCart(this.product.id)
  }
}
