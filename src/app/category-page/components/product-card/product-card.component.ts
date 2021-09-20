import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IProduct } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: IProduct

  @Input() breadcrumbs?: { category: string; subcategory: string }

  @Output()
  private addToCartEvent = new EventEmitter<string>()

  @Output()
  private removeFromCartEvent = new EventEmitter<string>()

  @Output()
  private addToFavoriteEvent = new EventEmitter<string>()

  @Output()
  private removeFromFavoriteEvent = new EventEmitter<string>()

  addToCart(itemId: string, event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.addToCartEvent.emit(itemId)
  }

  removeFromCart(itemId: string, event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.removeFromCartEvent.emit(itemId)
  }

  addToFavorite(itemId: string, event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.addToFavoriteEvent.emit(itemId)
  }

  removeFromFavorite(itemId: string, event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.removeFromFavoriteEvent.emit(itemId)
  }
}
