import { Injectable } from '@angular/core'
import { UserGoodsFacadeService } from 'src/app/core/services/user-goods/user-goods-facade.service'
import { ProductDetailsHttpService } from './product-details-http.service'
import { ProductDetailsStoreService } from './product-details-store.service'

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsFacadeService {
  product$ = this.store.product$

  constructor(
    private http: ProductDetailsHttpService,
    private store: ProductDetailsStoreService,
    private userGoodsFacade: UserGoodsFacadeService
  ) {}

  getProduct(id: string): void {
    this.http.getProduct(id).subscribe(p => {
      this.store.setProduct(p)
    })
  }
}
