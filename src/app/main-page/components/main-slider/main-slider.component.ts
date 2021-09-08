import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import SwiperCore, { Navigation } from 'swiper'
import { IMainPageSlide } from '../../models/main-slide.model'
import { MainPageHttpService } from '../../services/main-page-http.service'

SwiperCore.use([Navigation])

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit {
  slidesSubscription!: Subscription

  slides$?: Observable<IMainPageSlide[]>

  slides: IMainPageSlide[] = []

  constructor(private httpService: MainPageHttpService) {}

  ngOnInit(): void {
    this.slides$ = this.httpService.getMainSlideData()
  }
}
