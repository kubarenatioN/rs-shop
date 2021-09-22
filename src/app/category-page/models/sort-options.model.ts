import { ProductsSortType } from './products-sort.enum'
import { SortOrderType } from './sort-order.type'

export interface ISortOptions {
  type: ProductsSortType
  order: SortOrderType
}
