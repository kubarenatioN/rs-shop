import { Component } from '@angular/core'
import { ProductsSortType } from '../../models/products-sort.enum'
import { ProductsSortService } from '../../services/products-sort.service'

@Component({
  selector: 'app-sortbar',
  templateUrl: './sortbar.component.html',
  styleUrls: ['./sortbar.component.scss']
})
export class SortbarComponent {
  sortType = ProductsSortType

  constructor(private sortService: ProductsSortService) {}

  onSort(type: ProductsSortType): void {
    this.sortService.setSortOptions({
      type
    })
  }
}
