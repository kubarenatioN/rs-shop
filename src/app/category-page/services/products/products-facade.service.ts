import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { ProductsHttpService } from './products-http.service'
import { ProductsStoreService } from './products-store.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsFacadeService {
  products$ = this.store.products$

  isAllLoaded$ = this.store.isAllLoaded$

  constructor(
    private store: ProductsStoreService,
    private http: ProductsHttpService,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe(user => {
      // console.log('user:', user)
      this.store.user = user
      if (user !== null) {
        this.store.updateGoodsStatus(user)
      } else {
        this.store.resetGoodsStatus()
      }
    })
  }

  getProducts(
    categoryId: string,
    subcategoryId: string,
    pageNumber: number = 0
  ): void {
    this.http
      .getProductsBySubcategory(categoryId, subcategoryId, pageNumber)
      .subscribe(products => {
        if (products.length === 0) {
          this.store.setIsAllLoaded(true)
          return
        }
        this.store.addProducts(products)
      })
  }

  clear(): void {
    this.store.clear()
  }
}
