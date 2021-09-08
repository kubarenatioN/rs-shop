import { Component } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent {
  private isActive$$ = new BehaviorSubject<boolean>(false)

  isActive$ = this.isActive$$.asObservable()

  toggle(): void {
    this.isActive$$.next(!this.isActive$$.value)
  }

  close(): void {
    this.isActive$$.next(false)
  }
}
