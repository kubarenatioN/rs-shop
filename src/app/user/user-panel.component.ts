import { Component } from '@angular/core'
import { AuthService } from '../core/services/auth/auth.service'
import { CartComponent } from './pages/cart/cart.component'
import { FavoriteComponent } from './pages/favorite/favorite.component'
import { WaitlistComponent } from './pages/waitlist/waitlist.component'

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {
  title = ''

  constructor(private auth: AuthService) {}

  componentAdded(
    component: CartComponent | FavoriteComponent | WaitlistComponent
  ): void {
    this.title = component.headingTitle
  }

  logout(): void {
    this.auth.logout()
  }
}
