import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IProduct } from '../shared/models/product.model'
import { ProductDetailsHttpService } from './services/product-details-http.service'

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  product?: IProduct

  constructor(
    private route: ActivatedRoute,
    private http: ProductDetailsHttpService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.http.getProduct(id).subscribe(product => {
      this.product = product
      console.log(product)
    })
  }
}
