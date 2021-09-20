import { Component, Input } from '@angular/core'
import SwiperCore, { Navigation } from 'swiper'
import { IMainPageSlide } from '../../models/main-slide.model'

SwiperCore.use([Navigation])

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent {
  @Input() slides: IMainPageSlide[] = []
}
