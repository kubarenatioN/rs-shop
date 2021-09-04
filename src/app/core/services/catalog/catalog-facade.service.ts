import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { CatalogHttpService } from './catalog-http.service';
import { CatalogStoreService } from './catalog-store.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogFacadeService {
  baseCategories$ = this.store.baseCategories$
  isLoading$ = this.store.isLoading$

  constructor(private store: CatalogStoreService, private http: CatalogHttpService) { }

  loadBaseCategories() {
    if (this.store.hasBaseCategories) return
    this.store.setIsLoading(true)
    this.http.getBaseCategories().pipe(
      delay(1000)
    ).subscribe(categories => {
      this.store.setBaseCategories(categories)
      this.store.setIsLoading(false)
    })
  }

  getSecondaryCategories(baseCategoryId: string) {
    const baseCategory = this.store.baseCategories.find(category => {
      return category.id === baseCategoryId
    })
    return baseCategory?.subCategories || null 
  }

  get baseCategories() {
    return this.store.baseCategories
  }
}
