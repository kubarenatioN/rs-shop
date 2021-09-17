import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { ProductsFacadeService } from '../../services/products/products-facade.service'

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss']
})
export class SubcategoriesListComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription

  category: string = ''

  subcategories$ = this.productsFacade.subcategories$

  constructor(
    private route: ActivatedRoute,
    private productsFacade: ProductsFacadeService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(route => {
      this.category = route.category
      this.productsFacade.getSubcategories(this.category)
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
