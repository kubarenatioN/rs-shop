import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBaseCategory } from 'src/app/shared/models/base-category.model';
import { IProduct } from 'src/app/shared/models/product.model';
import { CatalogDropdownService } from '../../services/catalog-dropdown.service';
import { CatalogFacadeService } from '../../services/catalog/catalog-facade.service';

@Component({
  selector: 'app-catalog-dropdown',
  templateUrl: './catalog-dropdown.component.html',
  styleUrls: ['./catalog-dropdown.component.scss']
})
export class CatalogDropdownComponent implements OnInit{
  isActive$ = this.dropdownService.isActive$

  isLoading$ = this.catalogFacade.isLoading$

  baseCategories: IBaseCategory[] = []

  secondaryCategories: IProduct[] = []

  constructor(private dropdownService: CatalogDropdownService, private catalogFacade: CatalogFacadeService) { }

  ngOnInit() {
    this.catalogFacade.loadBaseCategories()
    this.catalogFacade.baseCategories$.subscribe(categories => {
      this.baseCategories = categories
      if (categories.length > 0) {
        this.loadOtherCategories(this.baseCategories[0].id)
      }
    })
  }

  loadOtherCategories(baseCategoryId: string) {
    this.secondaryCategories = this.catalogFacade.getSecondaryCategories(baseCategoryId) || []
  }

}
