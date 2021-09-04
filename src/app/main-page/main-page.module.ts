import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { PopularGoodsComponent } from './components/popular-goods/popular-goods.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PopularProductCardComponent } from './components/popular-product-card/popular-product-card.component';



@NgModule({
  declarations: [
    MainSliderComponent,
    MainComponent,
    PopularGoodsComponent,
    MainSliderComponent,
    PopularProductCardComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    MainPageRoutingModule
  ],
  exports: [MainComponent, MainSliderComponent]
})
export class MainPageModule { }
