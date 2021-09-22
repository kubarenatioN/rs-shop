import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { IOfferItem } from '../components/offer-item/offer-item.component'
import { ICategoriesResponse } from '../models/categories-response.model'
import { IMainPageSlide } from '../models/main-slide.model'

@Injectable({
  providedIn: 'root'
})
export class MainPageHttpService {
  private slidesUrl = './assets/main-slider.json'

  private offersUrl = './assets/main-offers.json'

  // remove it to config.json
  private popularUrl = 'http://localhost:3004/goods'

  private slides$$ = new Subject<IMainPageSlide[]>()

  private offers$$ = new Subject<IOfferItem[]>()

  slides$ = this.slides$$.asObservable()

  offers$ = this.offers$$.asObservable()

  constructor(private http: HttpClient) {}

  getMainSlideData(): void {
    this.http.get<IMainPageSlide[]>(this.slidesUrl).subscribe(slides => {
      this.slides$$.next(slides)
    })
  }

  getOffers(): void {
    this.http.get<IOfferItem[]>(this.offersUrl).subscribe(offers => {
      this.offers$$.next(offers)
    })
  }

  getAllGoods(): Observable<ICategoriesResponse> {
    return this.http.get<ICategoriesResponse>(this.popularUrl)
  }
}
