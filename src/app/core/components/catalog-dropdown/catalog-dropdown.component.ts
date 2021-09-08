import { Component, OnInit } from '@angular/core'
import { IBaseCategory } from 'src/app/shared/models/base-category.model'
import { IProduct } from 'src/app/shared/models/product.model'
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

  baseCategories: IBaseCategory[] = []

  secondaryCategories: IProduct[] = []

  currentBaseCategoryId = ''

  constructor(
    private dropdownService: CatalogDropdownService,
    private catalogFacade: CatalogFacadeService
  ) {}

  ngOnInit(): void {
    this.catalogFacade.loadBaseCategories()
    this.catalogFacade.baseCategories$.subscribe(categories => {
      this.baseCategories = categories
      if (categories.length > 0) {
        this.loadOtherCategories(this.baseCategories[0].id)
      }
    })
  }

  toggle(): void {
    this.dropdownService.toggle()
  }

  close(): void {
    this.dropdownService.close()
  }

  loadOtherCategories(baseCategoryId: string): void {
    this.secondaryCategories =
      this.catalogFacade.getSecondaryCategories(baseCategoryId) || []
    this.currentBaseCategoryId = baseCategoryId
  }
}
