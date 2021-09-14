import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class UserGoodsHttpService {
  private baseUrl = 'http://localhost:3004/users'

  constructor(private http: HttpClient, private auth: AuthService) {}

  addToCart(productId: string): Observable<Object> {
    const body = {
      id: productId
    }
    return this.http.post(`${this.baseUrl}/cart`, body, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    })
  }

  removeFromCart(productId: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/cart`, {
      params: {
        id: productId
      },
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    })
  }

  addToFavorite(productId: string): Observable<Object> {
    const body = {
      id: productId
    }
    return this.http.post(`${this.baseUrl}/favorites`, body, {
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    })
  }

  removeFromFavorite(productId: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/favorites`, {
      params: {
        id: productId
      },
      headers: {
        Authorization: `Bearer ${this.auth.token}`
      }
    })
  }
}
