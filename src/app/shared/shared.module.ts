import { NgModule } from '@angular/core';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SwiperModule } from 'swiper/angular'
import { CommonModule } from '@angular/common';
import { ContactsStyleDirective } from './directives/contacts-style.directive';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactsStyleDirective
  ],
  imports: [CommonModule, SwiperModule],
  exports: [CommonModule, ContactsComponent, SwiperModule]
})
export class SharedModule { }
