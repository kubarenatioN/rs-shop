import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ICategory } from 'src/app/shared/models/category.model'

@Injectable({
  providedIn: 'root'
})
export class CatalogHttpService {
  private baseUrl = 'http://localhost:3004/'

  private baseCategoriesUrl = 'categories'

  constructor(private http: HttpClient) {}

  getBaseCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(
      `${this.baseUrl}${this.baseCategoriesUrl}`
    )
  }
}
