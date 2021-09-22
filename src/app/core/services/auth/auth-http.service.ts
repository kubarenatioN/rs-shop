import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, concatMap, delay } from 'rxjs/operators'
import { IUserInfo } from 'src/app/shared/models/user-info.model'
import { IUserLoginResponse } from 'src/app/shared/models/user-login-response.model'
import { IUserLogin } from 'src/app/shared/models/user-login.model'
import { IUserRegisterResponse } from 'src/app/shared/models/user-register-response.model'
import { IUserRegister } from 'src/app/shared/models/user-register.model'

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private baseUrl = 'http://localhost:3004/users'

  private token$$ = new BehaviorSubject<string | null>(null)

  token$ = this.token$$.asObservable()

  constructor(private http: HttpClient) {}

  loginUser(user: IUserLogin): Observable<IUserInfo> {
    return this.http
      .post<IUserLoginResponse>(`${this.baseUrl}/login`, user)
      .pipe(
        catchError(err => throwError(err)),
        delay(2000),
        concatMap(loginRes => this.getUserInfo(loginRes.token))
      )
  }

  registerUser(registerData: IUserRegister): Observable<IUserInfo> {
    return this.http
      .post<IUserRegisterResponse>(`${this.baseUrl}/register`, registerData)
      .pipe(
        catchError(err => throwError(err)),
        concatMap(registerRes => this.getUserInfo(registerRes.token))
      )
  }

  getUserInfo(token: string): Observable<IUserInfo> {
    this.token$$.next(token)
    return this.http.get<IUserInfo>(`${this.baseUrl}/userInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
