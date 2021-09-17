import { Component } from '@angular/core'
import { UserGoodsFacadeService } from 'src/app/core/services/user-goods/user-goods-facade.service'

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  headingTitle = 'Избранные товары'

  products$ = this.userGoodsFacade.favoriteProducts$

  constructor(private userGoodsFacade: UserGoodsFacadeService) {}

  addToCart(id: string): void {
    this.userGoodsFacade.addToCart(id)
  }

  removeFromCart(id: string): void {
    this.userGoodsFacade.removeFromCart(id)
  }

  removeFromFavorite(id: string): void {
    this.userGoodsFacade.removeFromFavorite(id)
  }
}
