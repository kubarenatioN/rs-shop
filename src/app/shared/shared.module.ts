import { NgModule } from '@angular/core'
import { SwiperModule } from 'swiper/angular'
import { CommonModule } from '@angular/common'
import { ContactsComponent } from './components/contacts/contacts.component'
import { DropdownDirective } from './directives/dropdown.directive'

@NgModule({
  declarations: [ContactsComponent, DropdownDirective],
  imports: [CommonModule, SwiperModule],
  exports: [CommonModule, ContactsComponent, SwiperModule, DropdownDirective]
})
export class SharedModule {}
