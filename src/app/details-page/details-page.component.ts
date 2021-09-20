import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import SwiperCore, { Swiper, Thumbs } from 'swiper'
import { SwiperComponent } from 'swiper/angular'
import { CatalogFacadeService } from '../core/services/catalog/catalog-facade.service'
import { UserGoodsFacadeService } from '../core/services/user-goods/user-goods-facade.service'
import { ICategory } from '../shared/models/category.model'
import { IProduct } from '../shared/models/product.model'
import { ISubCategory } from '../shared/models/subcategory.model'
import { ProductDetailsFacadeService } from './services/details/product-details-facade.service'

SwiperCore.use([Thumbs])

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, AfterViewInit {
  product?: IProduct

  breadcrumbs?: { category?: ICategory; subcategory?: ISubCategory }

  product$ = this.facade.product$

  detailsSwiperThumbs!: Swiper

  @ViewChild('detailsSwiper', { static: false })
  detailsSwiper!: SwiperComponent

  constructor(
    private route: ActivatedRoute,
    private facade: ProductDetailsFacadeService,
    private userGoodsFacade: UserGoodsFacadeService,
    private catalogFacade: CatalogFacadeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.facade.getProduct(id)
    this.getBreadcrumbs(this.route.snapshot)
  }

  ngAfterViewInit(): void {
    console.log('after view init')
    // console.log(this.detailsSwiper)
  }

  isInCart(id: string): boolean {
    return this.userGoodsFacade.isInCart(id)
  }

  isInFavorite(id: string): boolean {
    return this.userGoodsFacade.isInFavorite(id)
  }

  addToCart(id: string): void {
    this.userGoodsFacade.addToCart(id)
  }

  removeFromCart(id: string): void {
    this.userGoodsFacade.removeFromCart(id)
  }

  addToFavorite(id: string): void {
    this.userGoodsFacade.addToFavorite(id)
  }

  removeFromFavorite(id: string): void {
    this.userGoodsFacade.removeFromFavorite(id)
  }

  getBreadcrumbs(snapshot: ActivatedRouteSnapshot): void {
    const categoryId = snapshot.queryParamMap.get('category') ?? ''
    const subcategoryId = snapshot.queryParamMap.get('subcategory')
    const category = this.catalogFacade.getCategory(categoryId)
    const subcategory = category?.subCategories.find(
      subcat => subcat.id === subcategoryId
    )
    this.breadcrumbs = {
      category,
      subcategory
    }
  }
}
