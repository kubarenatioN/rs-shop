import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IProduct } from 'src/app/shared/models/product.model'
import { IUserInfo } from 'src/app/shared/models/user-info.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsStoreService {
  private products$$ = new BehaviorSubject<IProduct[]>([])

  private isAllLoaded$$ = new BehaviorSubject<boolean>(false)

  products$ = this.products$$.asObservable()

  isAllLoaded$ = this.isAllLoaded$$.asObservable()

  user: IUserInfo | null = null

  addProducts(products: IProduct[]): void {
    this.products$$.next([...this.products$$.value, ...products])
    if (this.user !== null) {
      this.updateGoodsStatus(this.user)
    }
  }

  setIsAllLoaded(isLoaded: boolean): void {
    this.isAllLoaded$$.next(isLoaded)
  }

  clear(): void {
    this.isAllLoaded$$.next(false)
    this.products$$.next([])
  }

  resetGoodsStatus(): void {
    let newProducts = this.products$$.value
    newProducts = newProducts.map(p => ({
      ...p,
      isInCart: false,
      isFavorite: false
    }))
    this.products$$.next(newProducts)
  }

  updateGoodsStatus(user: IUserInfo): void {
    this.updateCartStatus(user.cart)
    this.updateFavoriteStatus(user.favorites)
  }

  updateCartStatus(cart: string[]): void {
    let newProducts = this.products$$.value
    newProducts = newProducts.map(p => {
      if (cart.includes(p.id)) {
        return {
          ...p,
          isInCart: true
        }
      }
      return {
        ...p,
        isInCart: false
      }
    })
    this.products$$.next(newProducts)
  }

  updateFavoriteStatus(fav: string[]): void {
    let newProducts = this.products$$.value
    newProducts = newProducts.map(p => {
      if (fav.includes(p.id)) {
        return {
          ...p,
          isFavorite: true
        }
      }
      return {
        ...p,
        isFavorite: false
      }
    })
    this.products$$.next(newProducts)
  }
}
