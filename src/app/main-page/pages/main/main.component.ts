import { Component, OnInit } from '@angular/core'
import { MainPageHttpService } from '../../services/main-page-http.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  slides$ = this.mainService.slides$

  offers$ = this.mainService.offers$

  constructor(private mainService: MainPageHttpService) {}

  ngOnInit(): void {
    this.mainService.getMainSlideData()
    this.mainService.getOffers()
  }
}
