import { Component, Input } from '@angular/core'
import { IProduct } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent {
  @Input() product!: IProduct
}
