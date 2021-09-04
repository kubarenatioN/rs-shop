import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from 'src/app/shared/models/category.model';
import { IPrimaryCategory } from 'src/app/shared/models/primary-category.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderHttpService {
  private categoriesReqUrl = 'http://localhost:3004/categories'

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<ICategory[]>(this.categoriesReqUrl)
  }
}
