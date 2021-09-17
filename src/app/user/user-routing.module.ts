import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CartComponent } from './pages/cart/cart.component'
import { FavoriteComponent } from './pages/favorite/favorite.component'
import { OrderEditComponent } from './pages/order-edit/order-edit.component'
import { WaitlistComponent } from './pages/waitlist/waitlist.component'
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
      },
      {
        path: 'edit-order/:id',
        component: OrderEditComponent
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
