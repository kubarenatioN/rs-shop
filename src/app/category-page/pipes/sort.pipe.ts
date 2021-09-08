import { Pipe, PipeTransform } from '@angular/core'
import { IProduct } from 'src/app/shared/models/product.model'
import { ProductsSortType } from '../models/products-sort.enum'
import { ISortOptions } from '../models/sort-options.model'

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: IProduct[], options?: ISortOptions): IProduct[] {
    if (options === undefined) {
      return value
    }
    const { type } = options
    switch (type) {
      case ProductsSortType.Price:
        return this.sortByPrice(value)
      case ProductsSortType.Rating:
        return this.sortByRating(value)
      default:
        return value
    }
  }

  sortByPrice(value: IProduct[]): IProduct[] {
    return value.sort((a, b) => a.price - b.price)
  }

  sortByRating(value: IProduct[]): IProduct[] {
    return value.sort((a, b) => a.rating - b.rating)
  }
}
