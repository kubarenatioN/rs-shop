import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { UserGoodsFacadeService } from 'src/app/core/services/user-goods/user-goods-facade.service'
import { IProduct } from 'src/app/shared/models/product.model'
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

  private sortSubscription!: Subscription

  private productsSubscription!: Subscription

  private category: string = ''

  private subcategory: string = ''

  private pageNumber = 0

  products: IProduct[] = []

  // products$ = this.productsFacade.products$

  isAllLoaded$ = this.productsFacade.isAllLoaded$

  sortOptions: ISortOptions | null = null

  constructor(
    private route: ActivatedRoute,
    private productsFacade: ProductsFacadeService,
    private sortService: ProductsSortService,
    private userGoodsFacade: UserGoodsFacadeService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(route => {
      this.pageNumber = 0
      this.clearProductList()
      this.handleCategoryChanged(route)
    })
    this.sortSubscription = this.sortService.sortOptions$.subscribe(options => {
      this.sortOptions = options
      this.products = [...this.products]
    })
    this.productsSubscription = this.productsFacade.products$.subscribe(p => {
      this.products = [...p]
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
    this.sortSubscription.unsubscribe()
    this.productsSubscription.unsubscribe()
  }

  addItemToCart(itemId: string): void {
    this.userGoodsFacade.addToCart(itemId)
  }

  removeItemFromCart(itemId: string): void {
    this.userGoodsFacade.removeFromCart(itemId)
  }

  addItemToFavorite(itemId: string): void {
    this.userGoodsFacade.addToFavorite(itemId)
  }

  removeItemFromFavorite(itemId: string): void {
    this.userGoodsFacade.removeFromFavorite(itemId)
  }

  private handleCategoryChanged(route: Params): void {
    this.category = route.category
    this.subcategory = route.subcategory
    this.getProducts()
  }

  private getProducts(): void {
    // console.log('try to get products from products-list component')
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
