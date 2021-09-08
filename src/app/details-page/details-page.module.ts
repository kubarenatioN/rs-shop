import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { ProductSliderComponent } from './components/product-slider/product-slider.component'
import { DetailsPageRoutingModule } from './details-page-routing.module'
import { DetailsPageComponent } from './details-page.component'

@NgModule({
  declarations: [DetailsPageComponent, ProductSliderComponent],
  imports: [CommonModule, SharedModule, DetailsPageRoutingModule]
})
export class DetailsPageModule {}
