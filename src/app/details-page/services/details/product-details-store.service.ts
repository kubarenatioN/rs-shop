import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { UserGoodsFacadeService } from 'src/app/core/services/user-goods/user-goods-facade.service'
import { IProduct } from 'src/app/shared/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsStoreService {
  private product$$ = new Subject<IProduct>()

  product$ = this.product$$.asObservable()

  constructor(private userGoodsFacade: UserGoodsFacadeService) {}

  setProduct(product: IProduct): void {
    // const prod = product
    // if (this.userGoodsFacade.isInCart(product.id)) {
    //   prod.isInCart = true
    // }
    // if (this.userGoodsFacade.isInFavorite(product.id)) {
    //   prod.isFavorite = true
    // }
    // console.log('set product', prod)
    this.product$$.next(product)
  }
}
