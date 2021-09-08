import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IProduct } from 'src/app/shared/models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsStoreService {
  private products$$ = new BehaviorSubject<IProduct[]>([])

  private isAllLoaded$$ = new BehaviorSubject<boolean>(false)

  products$ = this.products$$.asObservable()

  isAllLoaded$ = this.isAllLoaded$$.asObservable()

  addProducts(products: IProduct[]): void {
    this.products$$.next([...this.products$$.value, ...products])
  }

  setIsAllLoaded(isLoaded: boolean): void {
    this.isAllLoaded$$.next(isLoaded)
  }

  clear(): void {
    this.isAllLoaded$$.next(false)
    this.products$$.next([])
  }
}
