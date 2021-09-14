import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ModalsControllerService } from 'src/app/shared/modals/services/modals-controller.service'
import { IUserInfo } from 'src/app/shared/models/user-info.model'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  private isActive$$ = new BehaviorSubject<boolean>(false)

  private user$$ = new BehaviorSubject<IUserInfo | null>(null)

  isActive$ = this.isActive$$.asObservable()

  user$ = this.user$$.asObservable()

  constructor(
    private modalsController: ModalsControllerService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(userInfo => {
      this.user$$.next(userInfo)
    })
  }

  toggle(): void {
    this.isActive$$.next(!this.isActive$$.value)
  }

  close(): void {
    this.isActive$$.next(false)
  }

  openModal(): void {
    this.modalsController.createLoginModal()
  }

  logout(): void {
    this.auth.logout()
  }
}
