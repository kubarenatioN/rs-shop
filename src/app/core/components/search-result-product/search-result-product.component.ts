import { Component, Input } from '@angular/core'
import { IProduct } from 'src/app/shared/models/product.model'

@Component({
  selector: 'app-search-result-product',
  templateUrl: './search-result-product.component.html',
  styleUrls: ['./search-result-product.component.scss']
})
export class SearchResultProductComponent {
  @Input() product!: IProduct
}
