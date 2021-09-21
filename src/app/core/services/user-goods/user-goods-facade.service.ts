import { Injectable } from '@angular/core'
import { forkJoin, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ProductsFacadeService } from 'src/app/category-page/services/products/products-facade.service'
import { IProduct } from 'src/app/shared/models/product.model'
import { AuthService } from '../auth/auth.service'
import { UserGoodsHttpService } from './user-goods-http.service'
import { UserGoodsStoreService } from './user-goods-store.service'

@Injectable({
  providedIn: 'root'
})
export class UserGoodsFacadeService {
  cartProducts$ = this.store.cart$

  favoriteProducts$ = this.store.favorites$

  constructor(
    private http: UserGoodsHttpService,
    private store: UserGoodsStoreService,
    private auth: AuthService,
    private productsFacade: ProductsFacadeService
  ) {
    this.auth.user$.subscribe(user => {
      console.log('user: ', user)
      this.store.cart = user?.cart ?? []
      this.store.favorites = user?.favorites ?? []
      this.setUserGoods()
    })
  }

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

  isInCart(id: string): boolean {
    return this.store.isInCart(id)
  }

  isInFavorite(id: string): boolean {
    return this.store.isInFavorite(id)
  }

  setUserGoods(): void {
    forkJoin([this.setCartGoods(), this.setFavoriteGoods()]).subscribe(() => {
      this.productsFacade.updateGoodsStatus()
    })
  }

  setCartGoods(): Observable<IProduct[]> {
    return this.productsFacade.getProductsById(this.store.cart).pipe(
      map(products =>
        products.map(p => ({
          ...p,
          isInCart: this.isInCart(p.id),
          isFavorite: this.isInFavorite(p.id)
        }))
      ),
      tap(res => {
        this.store.setCartGoods(res)
      })
    )
  }

  setFavoriteGoods(): Observable<IProduct[]> {
    return this.productsFacade.getProductsById(this.store.favorites).pipe(
      map(products =>
        products.map(p => ({
          ...p,
          isInCart: this.isInCart(p.id),
          isFavorite: this.isInFavorite(p.id)
        }))
      ),
      tap(res => {
        this.store.setFavoriteGoods(res)
      })
    )
  }
}
