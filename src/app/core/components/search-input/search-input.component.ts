import { Component } from '@angular/core'
import { HeaderHttpService } from '../../services/header-http.service'

const CHARS_TO_START_SEARCH = 2

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  searchProducts$ = this.headerService.searchProducts$

  searchCategories$ = this.headerService.searchCategories$

  isActive = false

  constructor(private headerService: HeaderHttpService) {}

  onSearch(query: string): void {
    if (query.length > CHARS_TO_START_SEARCH) {
      this.headerService.search(query)
      this.isActive = true
    } else {
      this.isActive = false
    }
  }
}
