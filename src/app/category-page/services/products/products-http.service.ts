import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IProduct } from 'src/app/shared/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsHttpService {
  private baseUrl = 'http://localhost:3004'

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
}
