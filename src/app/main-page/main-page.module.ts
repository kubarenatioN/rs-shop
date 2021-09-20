import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { MainSliderComponent } from './components/main-slider/main-slider.component'
import { OfferItemComponent } from './components/offer-item/offer-item.component'
import { PopularGoodsComponent } from './components/popular-goods/popular-goods.component'
import { PopularProductCardComponent } from './components/popular-product-card/popular-product-card.component'
import { MainPageRoutingModule } from './main-page-routing.module'
import { MainComponent } from './pages/main/main.component'

@NgModule({
  declarations: [
    MainSliderComponent,
    MainComponent,
    PopularGoodsComponent,
    MainSliderComponent,
    PopularProductCardComponent,
    OfferItemComponent
  ],
  imports: [SharedModule, HttpClientModule, MainPageRoutingModule],
  exports: [MainComponent, MainSliderComponent]
})
export class MainPageModule {}
