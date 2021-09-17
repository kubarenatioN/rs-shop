import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IProduct } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent {
  @Input() product!: IProduct

  @Output()
  private removeFromCartEvent = new EventEmitter<string>()

  @Output()
  private addToCartEvent = new EventEmitter<string>()

  @Output()
  private removeFromFavoriteEvent = new EventEmitter<string>()

  addToCart(): void {
    this.addToCartEvent.emit(this.product.id)
  }

  removeFromCart(): void {
    this.removeFromCartEvent.emit(this.product.id)
  }

  removeFromFavorite(): void {
    this.removeFromFavoriteEvent.emit(this.product.id)
  }
}
