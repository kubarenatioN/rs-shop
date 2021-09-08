import { Injectable } from '@angular/core'
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
    private http: ProductsHttpService
  ) {}

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
