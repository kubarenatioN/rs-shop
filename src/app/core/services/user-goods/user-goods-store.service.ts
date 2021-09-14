import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserGoodsStoreService {
  private cart$$ = new BehaviorSubject<string[]>([])

  cart$ = this.cart$$.asObservable()

  setProducts(products: string[]): void {
    this.cart$$.next([...this.cart$$.value, ...products])
  }
}
