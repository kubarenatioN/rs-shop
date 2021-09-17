import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { IProduct } from 'src/app/shared/models/product.model'
import { ProductsHttpService } from './products-http.service'
import { ProductsStoreService } from './products-store.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsFacadeService {
  products$ = this.store.products$

  subcategories$ = this.store.subcategories$

  isAllLoaded$ = this.store.isAllLoaded$

  constructor(
    private store: ProductsStoreService,
    private http: ProductsHttpService,
    private auth: AuthService
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
        this.store.addProducts(products, this.auth.token !== null)
      })
  }

  clear(): void {
    this.store.clear()
  }

  getProductsById(ids: string[]): Observable<IProduct[]> {
    return this.http.getProductsById(ids)
  }

  updateGoodsStatus(): void {
    this.store.updateGoodsStatus()
  }

  getSubcategories(id: string): void {
    this.http.getSubcategories(id).subscribe(res => {
      this.store.setSubcategories(res?.subCategories ?? [])
    })
  }
}
