import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ICategory } from 'src/app/shared/models/category.model'

@Injectable({
  providedIn: 'root'
})
export class CatalogStoreService {
  private baseCategories$$ = new BehaviorSubject<ICategory[]>([])

  private isLoading$$ = new BehaviorSubject<boolean>(true)

  baseCategories$ = this.baseCategories$$.asObservable()

  isLoading$ = this.isLoading$$.asObservable()

  setBaseCategories(categories: ICategory[]): void {
    this.baseCategories$$.next(categories)
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading)
  }

  get hasBaseCategories(): boolean {
    return this.baseCategories$$.value.length > 0
  }

  get baseCategories(): ICategory[] {
    return this.baseCategories$$.value
  }
}
