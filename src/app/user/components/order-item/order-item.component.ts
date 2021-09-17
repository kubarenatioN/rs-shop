import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { IOrderItem } from 'src/app/shared/models/order-item.model'
import { IProduct } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements AfterContentInit {
  @Input() product!: IProduct

  @Input() amount = 0

  price?: number

  @Output() itemChanged = new EventEmitter<IOrderItem>()

  @Output() removeFromListEvent = new EventEmitter<string>()

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

  removeFromList(): void {
    this.removeFromListEvent.emit(this.product.id)
    console.log('remove from list', this.product.id)
  }
}
