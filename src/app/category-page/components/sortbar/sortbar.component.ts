import { Component } from '@angular/core'
import { ProductsSortType } from '../../models/products-sort.enum'
import { ISortOptions } from '../../models/sort-options.model'
import { ProductsSortService } from '../../services/products-sort.service'

@Component({
  selector: 'app-sortbar',
  templateUrl: './sortbar.component.html',
  styleUrls: ['./sortbar.component.scss']
})
export class SortbarComponent {
  options: ISortOptions = {
    type: ProductsSortType.None,
    order: 1
  }

  sortType = ProductsSortType

  constructor(private sortService: ProductsSortService) {}

  onSort(type: ProductsSortType): void {
    if (this.options.type === type) {
      this.options.order *= -1
    } else {
      this.options.type = type
      this.options.order = 1
    }
    this.sortService.setSortOptions(this.options)
  }
}
