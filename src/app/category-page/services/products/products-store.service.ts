import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserGoodsStoreService } from 'src/app/core/services/user-goods/user-goods-store.service'
import { IProduct } from 'src/app/shared/models/product.model'
import { ISubCategory } from 'src/app/shared/models/subcategory.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsStoreService {
  private products$$ = new BehaviorSubject<IProduct[]>([])

  private isAllLoaded$$ = new BehaviorSubject<boolean>(false)

  private subcategories$$ = new BehaviorSubject<ISubCategory[]>([])

  products$ = this.products$$.asObservable()

  subcategories$ = this.subcategories$$.asObservable()

  isAllLoaded$ = this.isAllLoaded$$.asObservable()

  isUserLogged = false

  get products(): IProduct[] {
    return this.products$$.value
  }

  constructor(private userGoodsStore: UserGoodsStoreService) {}

  addProducts(products: IProduct[], isUserLogged: boolean): void {
    this.isUserLogged = isUserLogged
    if (this.isUserLogged) {
      this.checkNewGoodsStatus(products)
    } else {
      this.setProducts([...this.products, ...products])
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
    let newProducts = this.products
    newProducts = newProducts.map(p => ({
      ...p,
      isInCart: false,
      isFavorite: false
    }))
    this.setProducts(newProducts)
  }

  updateGoodsStatus(): void {
    const newProducts = this.products.map(p => ({
      ...p,
      isInCart: this.userGoodsStore.isInCart(p.id),
      isFavorite: this.userGoodsStore.isInFavorite(p.id)
    }))
    this.setProducts(newProducts)
  }

  checkNewGoodsStatus(newGoods: IProduct[]): void {
    const newProducts = newGoods.map(p => ({
      ...p,
      isInCart: this.userGoodsStore.isInCart(p.id),
      isFavorite: this.userGoodsStore.isInFavorite(p.id)
    }))
    this.setProducts([...this.products, ...newProducts])
  }

  setProducts(products: IProduct[]): void {
    this.products$$.next(products)
  }

  setSubcategories(subcategories: ISubCategory[]): void {
    this.subcategories$$.next(subcategories)
  }
}
