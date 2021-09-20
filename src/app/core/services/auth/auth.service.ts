import { Injectable } from '@angular/core'
import { IUserInfo } from 'src/app/shared/models/user-info.model'
import { IUserLogin } from 'src/app/shared/models/user-login.model'
import { IUserRegister } from 'src/app/shared/models/user-register.model'
import { AuthHttpService } from './auth-http.service'
import { AuthStoreService } from './auth-store.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = this.store.user$

  token: string | null = null

  constructor(private http: AuthHttpService, private store: AuthStoreService) {
    this.store.token$.subscribe(token => {
      this.token = token
      this.getUserInfo()
    })
    this.http.token$.subscribe(token => {
      this.token = token
    })
  }

  loginUser(user: IUserLogin): void {
    this.http.loginUser(user).subscribe(
      res => {
        this.store.setUser(res, this.token)
      },
      err => {
        console.log('login error:', err)
      }
    )
  }

  logout(): void {
    this.store.removeUser()
  }

  registerUser(userRegister: IUserRegister): void {
    this.http.registerUser(userRegister).subscribe(
      res => {
        this.store.setUser(res, this.token)
      },
      err => {
        console.log('register error:', err)
      }
    )
  }

  getUserInfo(): void {
    if (this.token === null) return
    this.http.getUserInfo(this.token).subscribe((info: IUserInfo) => {
      this.store.setUser(info, this.token)
    })
  }

  getCart(): string[] {
    return this.store.userCart
  }

  getFavorites(): string[] {
    return this.store.userFavorites
  }
}
