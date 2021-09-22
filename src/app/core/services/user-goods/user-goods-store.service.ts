import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IProduct } from 'src/app/shared/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class UserGoodsStoreService {
  cart: string[] = []

  favorites: string[] = []

  private cart$$ = new BehaviorSubject<IProduct[]>([])

  private favorites$$ = new BehaviorSubject<IProduct[]>([])

  cart$ = this.cart$$.asObservable()

  favorites$ = this.favorites$$.asObservable()

  setCartGoods(cart: IProduct[]): void {
    // console.log('cart from store: ', cart)
    this.cart$$.next(cart)
  }

  setFavoriteGoods(favorites: IProduct[]): void {
    this.favorites$$.next(favorites)
  }

  isInCart(id: string): boolean {
    return this.cart.includes(id)
  }

  isInFavorite(id: string): boolean {
    return this.favorites.includes(id)
  }
}
