import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserGoodsStoreService } from 'src/app/core/services/user-goods/user-goods-store.service'
import { IProduct } from 'src/app/shared/models/product.model'
import { ISecondaryCategory } from 'src/app/shared/models/secondary-category.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsStoreService {
  private products$$ = new BehaviorSubject<IProduct[]>([])

  private isAllLoaded$$ = new BehaviorSubject<boolean>(false)

  private subcategories$$ = new BehaviorSubject<ISecondaryCategory[]>([])

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
    // console.log('add products', products, this.isUserLogged)
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
    console.log('new goods: ', newGoods)
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

  setSubcategories(subcategories: ISecondaryCategory[]): void {
    this.subcategories$$.next(subcategories)
  }
}
