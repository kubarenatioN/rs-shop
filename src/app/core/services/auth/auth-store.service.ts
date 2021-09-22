import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { IUserInfo } from 'src/app/shared/models/user-info.model'

const TOKEN = 'token'

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private user$$ = new BehaviorSubject<IUserInfo | null>(null)

  private token$$ = new BehaviorSubject<string | null>(
    this.tokenFromLocalStorage
  )

  user$ = this.user$$.asObservable()

  token$ = this.token$$.asObservable()

  token: string | null = null

  get userCart(): string[] {
    return this.user$$.value?.cart ?? []
  }

  get userFavorites(): string[] {
    return this.user$$.value?.favorites ?? []
  }

  setUser(user: IUserInfo, token: string | null): void {
    this.user$$.next(user)
    // console.log('user: ', user)
    if (token !== null) {
      this.saveTokenInLocalStorage(token)
    }
  }

  removeUser(): void {
    this.user$$.next(null)
    this.token$$.next(null)
    this.removeTokenFromLocalStorage()
  }

  saveTokenInLocalStorage(token: string): void {
    localStorage.setItem(TOKEN, token)
  }

  get tokenFromLocalStorage(): string | null {
    return localStorage.getItem(TOKEN)
  }

  removeTokenFromLocalStorage(): void {
    localStorage.removeItem(TOKEN)
  }
}
