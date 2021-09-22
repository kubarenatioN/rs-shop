import { Injectable } from '@angular/core'
import { Event, Router, RouterEvent } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CatalogDropdownService {
  private isActive$$ = new BehaviorSubject<boolean>(false)

  isActive$ = this.isActive$$.asObservable()

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe(() => {
        this.close()
      })
  }

  toggle(): void {
    this.isActive$$.next(!this.isActive$$.value)
  }

  close(): void {
    this.isActive$$.next(false)
  }
}
