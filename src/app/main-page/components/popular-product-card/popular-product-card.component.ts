import { Component, Input } from '@angular/core'
import { IProduct } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-popular-product-card',
  templateUrl: './popular-product-card.component.html',
  styleUrls: ['./popular-product-card.component.scss']
})
export class PopularProductCardComponent {
  @Input() product!: IProduct
}
