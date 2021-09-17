import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import SwiperCore, { Swiper, Thumbs } from 'swiper'
import { SwiperComponent } from 'swiper/angular'
import { UserGoodsFacadeService } from '../core/services/user-goods/user-goods-facade.service'
import { IProduct } from '../shared/models/product.model'
import { ProductDetailsFacadeService } from './services/details/product-details-facade.service'

SwiperCore.use([Thumbs])

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, AfterViewInit {
  product?: IProduct

  product$ = this.facade.product$

  // detailsSwiper!: Swiper

  detailsSwiperThumbs!: Swiper

  @ViewChild('detailsSwiper', { static: false })
  detailsSwiper!: SwiperComponent

  // @ViewChild('detailsSwiperThumbs', { static: false })
  // detailsSwiperThumbs!: SwiperComponent

  // detailsSwiperConfig: any = {
  //   slidesPerView: 1,
  //   spaceBetween: 10
  // }

  constructor(
    private route: ActivatedRoute,
    private facade: ProductDetailsFacadeService,
    private userGoodsFacade: UserGoodsFacadeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!
    this.facade.getProduct(id)
    this.product$.subscribe(p => {
      // this.product = p
      console.log(p)
    })

    // this.detailsSwiperThumbs = new Swiper('.details-main__thumbs-slider', {
    //   spaceBetween: 20,
    //   slidesPerView: 3
    // })

    // this.detailsSwiper = new Swiper('.details-main__slider', {
    //   spaceBetween: 10,
    //   slidesPerView: 1,
    //   thumbs: {
    //     swiper: this.detailsSwiperThumbs
    //   }
    // })
    // this.detailsSwiperThumbs.controller.control = this.detailsSwiper
  }

  ngAfterViewInit(): void {
    console.log(this.detailsSwiper)
    // console.log(this.detailsSwiper.swiperRef)
    // this.detailsSwiperConfig.thumbs = {
    //   swiper: this.detailsSwiperThumbs.s_swiper
    // }
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
}
