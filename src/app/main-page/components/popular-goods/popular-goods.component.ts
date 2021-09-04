import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model';
import { MainPageHttpService } from '../../services/main-page-http.service';

const NUM_OF_SLIDES = 6
const PRODUCTS_PER_SLIDE = 6

@Component({
  selector: 'app-popular-goods',
  templateUrl: './popular-goods.component.html',
  styleUrls: ['./popular-goods.component.scss']
})
export class PopularGoodsComponent implements OnInit {

  slides: IProduct[][] = []

  constructor(private http: MainPageHttpService) {}

  ngOnInit() {
    this.http.getAllGoods().subscribe(goods => {
      for (let i = 0; i < NUM_OF_SLIDES; i++) {
        const start = i * PRODUCTS_PER_SLIDE
        const end = start + PRODUCTS_PER_SLIDE
        const slide = goods.slice(start, end)
        this.slides.push(slide)
      }
    })
  }
}
