import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IBaseCategory } from 'src/app/shared/models/base-category.model'

@Injectable({
  providedIn: 'root'
})
export class CatalogStoreService {
  private baseCategories$$ = new BehaviorSubject<IBaseCategory[]>([])

  private isLoading$$ = new BehaviorSubject<boolean>(true)

  baseCategories$ = this.baseCategories$$.asObservable()

  isLoading$ = this.isLoading$$.asObservable()

  setBaseCategories(categories: IBaseCategory[]): void {
    this.baseCategories$$.next(categories)
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading)
  }

  get hasBaseCategories(): boolean {
    return this.baseCategories$$.value.length > 0
  }

  get baseCategories(): IBaseCategory[] {
    return this.baseCategories$$.value
  }
}
