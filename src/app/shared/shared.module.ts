import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SwiperModule } from 'swiper/angular'
import { ContactsComponent } from './components/contacts/contacts.component'
import { DropdownDirective } from './directives/dropdown.directive'
import { LoginModalComponent } from './modals/components/login-modal/login-modal.component';
import { RegisterModalComponent } from './modals/components/register-modal/register-modal.component'

@NgModule({
  declarations: [ContactsComponent, DropdownDirective, LoginModalComponent, RegisterModalComponent],
  imports: [CommonModule, SwiperModule, FormsModule],
  exports: [CommonModule, ContactsComponent, SwiperModule, DropdownDirective]
})
export class SharedModule {}
