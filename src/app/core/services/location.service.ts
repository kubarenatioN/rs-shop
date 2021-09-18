import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface IUserLocation {
  city: string
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private ipApiUrl = 'http://ip-api.com/json/?lang=ru'

  private location$$ = new BehaviorSubject<IUserLocation | null>(null)

  location$ = this.location$$.asObservable()

  locationsList = ['Брест', 'Гомель', 'Могилев']

  constructor(private http: HttpClient) {}

  getLocation(): void {
    this.http.get<IUserLocation>(this.ipApiUrl).subscribe(location => {
      this.location$$.next(location)
    })
  }

  changeLocation(id: number): void {
    this.location$$.next({ city: this.locationsList[id] })
  }
}
