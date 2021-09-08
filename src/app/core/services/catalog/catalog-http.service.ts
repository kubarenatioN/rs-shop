import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IBaseCategory } from 'src/app/shared/models/base-category.model'

@Injectable({
  providedIn: 'root'
})
export class CatalogHttpService {
  private baseUrl = 'http://localhost:3004/'

  private baseCategoriesUrl = 'categories'

  constructor(private http: HttpClient) {}

  getBaseCategories(): Observable<IBaseCategory[]> {
    return this.http.get<IBaseCategory[]>(
      `${this.baseUrl}${this.baseCategoriesUrl}`
    )
  }
}
