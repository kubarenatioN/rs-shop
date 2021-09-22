import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { SharedModule } from '../shared/shared.module'
import { CartItemComponent } from './components/cart-item/cart-item.component'
import { FavoriteItemComponent } from './components/favorite-item/favorite-item.component'
import { OrderEditItemComponent } from './components/order-edit-item/order-edit-item.component'
import { OrderFormComponent } from './components/order-form/order-form.component'
import { OrderItemComponent } from './components/order-item/order-item.component'
import { CartComponent } from './pages/cart/cart.component'
import { FavoriteComponent } from './pages/favorite/favorite.component'
import { OrderEditComponent } from './pages/order-edit/order-edit.component'
import { WaitlistComponent } from './pages/waitlist/waitlist.component'
import { UserPanelComponent } from './user-panel.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [
    CartComponent,
    UserPanelComponent,
    FavoriteComponent,
    WaitlistComponent,
    CartItemComponent,
    FavoriteItemComponent,
    OrderFormComponent,
    OrderEditComponent,
    OrderItemComponent,
    OrderEditItemComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class UserModule {}
