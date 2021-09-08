import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ICategory } from 'src/app/shared/models/category.model'

@Injectable({
  providedIn: 'root'
})
export class HeaderHttpService {
  private categoriesReqUrl = 'http://localhost:3004/categories'

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoriesReqUrl)
  }
}
