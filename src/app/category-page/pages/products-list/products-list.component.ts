import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { IProduct } from 'src/app/shared/models/product.model'
import { ProductsHttpService } from '../../services/products-http.service'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription

  private category: string = ''

  private subcategory: string = ''

  products$ = new Observable<IProduct[]>()

  constructor(
    private route: ActivatedRoute,
    private http: ProductsHttpService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(route => {
      this.handleRouteChanged(route)
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }

  handleRouteChanged(route: Params): void {
    this.category = route.category
    this.subcategory = route.subcategory
    this.getProducts()
  }

  getProducts(): void {
    this.products$ = this.http.getProductsBySubcategory(
      this.category,
      this.subcategory
    )
  }
}
