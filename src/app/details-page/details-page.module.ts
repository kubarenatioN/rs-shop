import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { DetailsPageRoutingModule } from './details-page-routing.module'
import { DetailsPageComponent } from './details-page.component'

@NgModule({
  declarations: [DetailsPageComponent],
  imports: [CommonModule, SharedModule, DetailsPageRoutingModule]
})
export class DetailsPageModule {}
