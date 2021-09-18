import { Component, OnInit } from '@angular/core'
import { ICategory } from 'src/app/shared/models/category.model'
import { ISubCategory } from 'src/app/shared/models/subcategory.model'
import { CatalogDropdownService } from '../../services/catalog-dropdown.service'
import { CatalogFacadeService } from '../../services/catalog/catalog-facade.service'

@Component({
  selector: 'app-catalog-dropdown',
  templateUrl: './catalog-dropdown.component.html',
  styleUrls: ['./catalog-dropdown.component.scss']
})
export class CatalogDropdownComponent implements OnInit {
  isActive$ = this.dropdownService.isActive$

  isLoading$ = this.catalogFacade.isLoading$

  baseCategories: ICategory[] = []

  subcategories: ISubCategory[] = []

  currentBaseCategory?: ICategory

  constructor(
    private dropdownService: CatalogDropdownService,
    private catalogFacade: CatalogFacadeService
  ) {}

  ngOnInit(): void {
    this.catalogFacade.loadBaseCategories()
    this.catalogFacade.baseCategories$.subscribe(categories => {
      this.baseCategories = categories
      if (categories.length > 0) {
        this.loadOtherCategories(this.baseCategories[0])
      }
    })
  }

  toggle(): void {
    this.dropdownService.toggle()
  }

  close(): void {
    this.dropdownService.close()
  }

  loadOtherCategories(category: ICategory): void {
    this.subcategories = this.catalogFacade.getSubCategories(category.id) || []
    this.currentBaseCategory = category
  }
}
