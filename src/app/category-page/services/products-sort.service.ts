import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ProductsSortType } from '../models/products-sort.enum'
import { ISortOptions } from '../models/sort-options.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsSortService {
  private sortOptions$$ = new BehaviorSubject<ISortOptions>({
    type: ProductsSortType.None
  })

  sortOptions$ = this.sortOptions$$.asObservable()

  setSortOptions(options: ISortOptions): void {
    this.sortOptions$$.next(options)
  }
}
