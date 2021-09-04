import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBaseCategory } from 'src/app/shared/models/base-category.model';
import { ICategory } from 'src/app/shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogStoreService {
  private baseCategories$$ = new BehaviorSubject<IBaseCategory[]>([])
  private isLoading$$ = new BehaviorSubject<boolean>(true)

  baseCategories$ = this.baseCategories$$.asObservable()
  isLoading$ = this.isLoading$$.asObservable()
  
  setBaseCategories(categories: IBaseCategory[]) {
    this.baseCategories$$.next(categories)
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading)
  }

  get hasBaseCategories() {
    return this.baseCategories$$.value.length > 0
  }

  get baseCategories() {
    return this.baseCategories$$.value
  }
}
