import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { ISortOptions } from '../../models/sort-options.model'
import { ProductsSortService } from '../../services/products-sort.service'
import { ProductsFacadeService } from '../../services/products/products-facade.service'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription

  private category: string = ''

  private subcategory: string = ''

  private pageNumber = 0

  products$ = this.productsFacade.products$

  isAllLoaded$ = this.productsFacade.isAllLoaded$

  sortOptions?: ISortOptions

  constructor(
    private route: ActivatedRoute,
    private productsFacade: ProductsFacadeService,
    private sortService: ProductsSortService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(route => {
      this.pageNumber = 0
      this.clearProductList()
      this.handleCategoryChanged(route)
    })
    this.sortService.sortOptions$.subscribe(options => {
      this.sortOptions = options
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }

  private handleCategoryChanged(route: Params): void {
    this.category = route.category
    this.subcategory = route.subcategory
    this.getProducts()
  }

  private getProducts(): void {
    this.productsFacade.getProducts(
      this.category,
      this.subcategory,
      this.pageNumber
    )
  }

  loadMoreProducts(): void {
    this.pageNumber += 1
    this.getProducts()
  }

  private clearProductList(): void {
    this.productsFacade.clear()
  }
}
