import { Injectable } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { UserGoodsHttpService } from './user-goods-http.service'

@Injectable({
  providedIn: 'root'
})
export class UserGoodsFacadeService {
  constructor(private http: UserGoodsHttpService, private auth: AuthService) {}

  addToCart(itemId: string): void {
    this.http.addToCart(itemId).subscribe(() => {
      this.auth.getUserInfo()
    })
  }

  removeFromCart(itemId: string): void {
    this.http.removeFromCart(itemId).subscribe(() => {
      this.auth.getUserInfo()
    })
  }

  addToFavorite(itemId: string): void {
    this.http.addToFavorite(itemId).subscribe(() => {
      this.auth.getUserInfo()
    })
  }

  removeFromFavorite(itemId: string): void {
    this.http.removeFromFavorite(itemId).subscribe(() => {
      this.auth.getUserInfo()
    })
  }
}
