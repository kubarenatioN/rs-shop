import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IMainPageSlide } from '../../models/main-slide.model';
import { MainPageHttpService } from '../../services/main-page-http.service';
import SwiperCore, {Navigation} from 'swiper'

SwiperCore.use([Navigation])

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent {
  slidesSubscription!: Subscription
  slides$?: Observable<IMainPageSlide[]>

  slides: IMainPageSlide[] = []

  constructor(private httpService: MainPageHttpService) { }

  ngOnInit() {
    this.slides$ = this.httpService.getMainSlideData()
  }

  onSwiper(swiper: any) {
    console.log('init')
    console.log(swiper)
  }

  onSlide(swiper: any) {
    console.log(swiper)
  }
}
