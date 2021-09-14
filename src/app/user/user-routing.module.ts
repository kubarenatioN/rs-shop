import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CartComponent } from './components/cart/cart.component'
import { FavoriteComponent } from './components/favorite/favorite.component'
import { WaitlistComponent } from './components/waitlist/waitlist.component'
import { UserPanelComponent } from './user-panel.component'

const routes: Routes = [
  {
    path: '',
    component: UserPanelComponent,
    children: [
      {
        path: '',
        component: CartComponent
      },
      {
        path: 'favorite',
        component: FavoriteComponent
      },
      {
        path: 'waitlist',
        component: WaitlistComponent
      }
    ]
  },
  {
    path: 'cart',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
