import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { forkJoin, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { ICategory } from 'src/app/shared/models/category.model'
import { IProduct } from 'src/app/shared/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {
  private baseUrl = 'http://localhost:3004'

  private goodsUrl = 'http://localhost:3004/goods'

  private productsPerRequest = 8

  constructor(private http: HttpClient) {}

  getProductsBySubcategory(
    categoryId: string,
    subcategoryId: string,
    pageNumber: number = 0
  ): Observable<IProduct[]> {
    const url = `${
      this.baseUrl
    }/goods/category/${categoryId}/${subcategoryId}?start=${
      pageNumber * this.productsPerRequest
    }&count=${this.productsPerRequest}`
    return this.http.get<IProduct[]>(url)
  }

  getProductsById(ids: string[]): Observable<IProduct[]> {
    if (ids.length === 0) {
      return of([])
    }
    return forkJoin(
      ids.map(id => this.http.get<IProduct>(`${this.goodsUrl}/item/${id}`))
    )
  }

  getSubcategories(id: string): Observable<ICategory | undefined> {
    const url = `${this.baseUrl}/categories`
    return this.http
      .get<ICategory[]>(url)
      .pipe(map(res => res.find(cat => cat.id === id)))
  }
}
