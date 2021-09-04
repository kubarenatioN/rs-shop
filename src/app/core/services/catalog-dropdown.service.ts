import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogDropdownService {

  private isActive$$ = new BehaviorSubject<boolean>(false)

  isActive$ = this.isActive$$.asObservable()

  constructor() { }

  toggle() {
    this.isActive$$.next(!this.isActive$$.value)
  }
}
