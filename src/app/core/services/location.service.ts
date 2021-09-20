import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { concatMap } from 'rxjs/operators'

export interface IUserCoords {
  latitude: number
  longitude: number
}

export interface IUserLocation {
  results: [
    {
      components: {
        city: string
      }
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  // private ipApiUrl = 'http://ip-api.com/json/?lang=ru'
  private coordsApi = 'https://ipapi.co/json'

  private locationApi = 'https://api.opencagedata.com/geocode/v1/json'

  private key = '03039f45941d4f4faabb20c82a9a5422'

  private location$$ = new BehaviorSubject<string>('')

  location$ = this.location$$.asObservable()

  locationsList = ['Брест', 'Витебск', 'Гомель', 'Гродно', 'Могилев', 'Минск']

  constructor(private http: HttpClient) {}

  getLocation(): void {
    this.http
      .get<IUserCoords>(this.coordsApi)
      .pipe(
        concatMap(coords =>
          this.http.get<IUserLocation>(`${this.locationApi}`, {
            params: {
              q: `${coords.latitude}+${coords.longitude}`,
              key: this.key,
              language: 'native'
            }
          })
        )
      )
      .subscribe(location => {
        this.location$$.next(location.results[0].components.city)
      })
  }

  changeLocation(id: number): void {
    this.location$$.next(this.locationsList[id])
  }
}
