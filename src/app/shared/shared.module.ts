import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SwiperModule } from 'swiper/angular'
import { AmountCounterComponent } from './components/amount-counter/amount-counter.component'
import { ContactsComponent } from './components/contacts/contacts.component'
import { StarRatingComponent } from './components/star-rating/star-rating.component'
import { AmountCheckerDirective } from './directives/amount-checker.directive'
import { DropdownDirective } from './directives/dropdown.directive'
import { MaterialModule } from './material/material.module'
import { LoginModalComponent } from './modals/components/login-modal/login-modal.component'
import { RegisterModalComponent } from './modals/components/register-modal/register-modal.component'

@NgModule({
  declarations: [
    ContactsComponent,
    DropdownDirective,
    LoginModalComponent,
    RegisterModalComponent,
    StarRatingComponent,
    AmountCheckerDirective,
    AmountCounterComponent
  ],
  imports: [CommonModule, SwiperModule, FormsModule, MaterialModule],
  exports: [
    CommonModule,
    ContactsComponent,
    SwiperModule,
    DropdownDirective,
    MaterialModule,
    StarRatingComponent,
    AmountCheckerDirective,
    AmountCounterComponent
  ]
})
export class SharedModule {}
