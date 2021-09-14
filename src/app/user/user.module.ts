import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CartComponent } from './components/cart/cart.component'
import { FavoriteComponent } from './components/favorite/favorite.component'
import { WaitlistComponent } from './components/waitlist/waitlist.component'
import { UserPanelComponent } from './user-panel.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [
    CartComponent,
    UserPanelComponent,
    FavoriteComponent,
    WaitlistComponent
  ],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule {}
