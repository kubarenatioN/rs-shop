import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IMainPageSlide } from '../models/main-slide.model';
import {delay, map, tap} from 'rxjs/operators'
import { IGoodsResponse } from '../models/goods-response.model';
import { concat } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MainPageHttpService {
  private mainPageSlidesReqUrl = './assets/main-slider.json'
  // remove it to config.json
  private popularUrl = 'http://localhost:3004/goods'

  constructor(private http: HttpClient) { }

  getMainSlideData() {
    return this.http.get<IMainPageSlide[]>(this.mainPageSlidesReqUrl)
  }

  getAllGoods() {
    return this.http.get<IGoodsResponse>(this.popularUrl)
    .pipe(
      map(res => Object.values(res).map(category => {
        return Object.values(category)
      })),
      map(subCategories => {
        let allGoods: IProduct[] = []
        Object.values(subCategories).forEach(subCategory => {
          subCategory.forEach(category => {
            allGoods = allGoods.concat(...category)
          })
        })
        return allGoods.sort((b, a) => a.rating - b.rating)
      })
    )
  }
}
