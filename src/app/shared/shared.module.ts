import { NgModule } from '@angular/core'
import { SwiperModule } from 'swiper/angular'
import { CommonModule } from '@angular/common'
import { ContactsComponent } from './components/contacts/contacts.component'
import { ContactsStyleDirective } from './directives/contacts-style.directive'
import { DropdownDirective } from './directives/dropdown.directive'

@NgModule({
  declarations: [ContactsComponent, ContactsStyleDirective, DropdownDirective],
  imports: [CommonModule, SwiperModule],
  exports: [CommonModule, ContactsComponent, SwiperModule, DropdownDirective]
})
export class SharedModule {}
