import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IProduct } from 'src/app/shared/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsHttpService {
  private baseUrl = 'http://localhost:3004/goods/item'

  constructor(private http: HttpClient) {}

  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`)
  }
}
