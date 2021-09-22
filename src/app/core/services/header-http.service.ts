import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of, Subject } from 'rxjs'
import { debounceTime, map, switchMap } from 'rxjs/operators'
import { ICategory } from 'src/app/shared/models/category.model'
import { IProduct } from 'src/app/shared/models/product.model'
import { ISubCategory } from 'src/app/shared/models/subcategory.model'
import { CatalogFacadeService } from './catalog/catalog-facade.service'

@Injectable({
  providedIn: 'root'
})
export class HeaderHttpService {
  private baseUrl = 'http://localhost:3004/goods/search'

  private searchQuery$$ = new Subject<string>()

  searchProducts$ = this.searchQuery$$.pipe(
    debounceTime(1000),
    switchMap(query =>
      this.http.get<IProduct[]>(this.baseUrl, {
        params: {
          text: query
        }
      })
    ),
    map(res => res.slice(0, 8))
  )

  searchCategories$ = this.searchQuery$$.pipe(
    debounceTime(1000),
    switchMap(query => {
      const all = this.catalogFacade.getCombinedCategories()
      const pattern = this.getPattern(query)
      const res = all.filter(v => pattern.test(v.name.toLowerCase()))
      const additional: ((ICategory | ISubCategory) & {
        categoryId: string | undefined
      })[] = []
      res.forEach(p => {
        const category = p as ICategory
        additional.push({
          ...category,
          categoryId: undefined
        })
        if (category.subCategories !== undefined) {
          additional.push(
            ...category.subCategories.slice(0, 3).map(subcat => ({
              ...subcat,
              categoryId: category.id
            }))
          )
        }
      })
      return of(additional)
    })
  )

  constructor(
    private http: HttpClient,
    private catalogFacade: CatalogFacadeService
  ) {}

  search(query: string): void {
    this.searchQuery$$.next(query)
  }

  private handleEscape = (str: string): string =>
    str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  private getPattern(query: string): RegExp {
    const matches = query.match(/\S+/g)
    if (matches === null) return new RegExp('')
    return new RegExp(
      `^${matches
        .map(this.handleEscape)
        .map(word => `(?=.*${word})`)
        .join('')}`,
      'i'
    )
  }
}
