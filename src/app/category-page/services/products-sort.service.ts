import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { ISortOptions } from '../models/sort-options.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsSortService {
  private sortOptions$$ = new Subject<ISortOptions>()

  sortOptions$ = this.sortOptions$$.asObservable()

  setSortOptions(options: ISortOptions): void {
    this.sortOptions$$.next(options)
  }
}
