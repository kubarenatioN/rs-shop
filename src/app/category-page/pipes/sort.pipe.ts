import { Pipe, PipeTransform } from '@angular/core'
import { IProduct } from 'src/app/shared/models/product.model'
import { ProductsSortType } from '../models/products-sort.enum'
import { ISortOptions } from '../models/sort-options.model'
import { SortOrderType } from '../models/sort-order.type'

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: IProduct[], options: ISortOptions | null): IProduct[] {
    if (options === null) {
      return value
    }
    const { type } = options
    const { order } = options
    switch (type) {
      case ProductsSortType.Price:
        return value.sort((a, b) => this.sortByPrice(a.price, b.price, order))
      case ProductsSortType.Rating:
        return value.sort((a, b) =>
          this.sortByRating(a.rating, b.rating, order)
        )
      case ProductsSortType.Amount:
        return value.sort((a, b) =>
          this.sortByRating(a.availableAmount, b.availableAmount, order)
        )
      default:
        return value
    }
  }

  private sortByPrice(a: number, b: number, order: SortOrderType): number {
    const res = a - b
    return order === 1 ? -res : res
  }

  private sortByRating(a: number, b: number, order: SortOrderType): number {
    const res = a - b
    return order === 1 ? -res : res
  }

  private sortByAmount(a: number, b: number, order: SortOrderType): number {
    const res = a - b
    return order === 1 ? -res : res
  }
}
