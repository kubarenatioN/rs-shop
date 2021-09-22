import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { IOrder } from 'src/app/shared/models/order-item.model'

@Injectable({
  providedIn: 'root'
})
export class OrdersHttpService {
  private baseUrl = 'http://localhost:3004/users/order'

  constructor(private http: HttpClient, private auth: AuthService) {}

  makeOrder(order: IOrder): Observable<Object> {
    console.log(this.auth.token)
    return this.http.post(this.baseUrl, order, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    })
  }

  removeOrder(id: string): Observable<Object> {
    console.log('remove order:', id)
    return this.http.delete(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      },
      params: {
        id
      }
    })
  }

  updateOrder(order: IOrder): Observable<Object> {
    console.log('put ', order)
    return this.http.put(`${this.baseUrl}`, order, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    })
  }
}
