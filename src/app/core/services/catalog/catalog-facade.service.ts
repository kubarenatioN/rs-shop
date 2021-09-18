import { Injectable } from '@angular/core'
import { ICategory } from 'src/app/shared/models/category.model'
import { ISubCategory } from 'src/app/shared/models/subcategory.model'
import { CatalogHttpService } from './catalog-http.service'
import { CatalogStoreService } from './catalog-store.service'

@Injectable({
  providedIn: 'root'
})
export class CatalogFacadeService {
  baseCategories$ = this.store.baseCategories$

  isLoading$ = this.store.isLoading$

  constructor(
    private store: CatalogStoreService,
    private http: CatalogHttpService
  ) {}

  loadBaseCategories(): void {
    if (this.store.hasBaseCategories) return
    this.store.setIsLoading(true)
    this.http.getBaseCategories().subscribe(categories => {
      this.store.setBaseCategories(categories)
      this.store.setIsLoading(false)
    })
  }

  getCombinedCategories(): (ICategory | ISubCategory)[] {
    let subcategories: ISubCategory[] = []
    this.store.baseCategories.forEach(cat => {
      subcategories = [...subcategories, ...cat.subCategories]
    })
    return [...this.store.baseCategories, ...subcategories]
  }

  getSubCategories(baseCategoryId: string): ISubCategory[] | null {
    const baseCategory = this.store.baseCategories.find(
      category => category.id === baseCategoryId
    )
    return baseCategory?.subCategories || null
  }

  get baseCategories(): ICategory[] {
    return this.store.baseCategories
  }
}
