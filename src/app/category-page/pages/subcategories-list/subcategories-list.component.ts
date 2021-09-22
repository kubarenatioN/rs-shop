import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { CatalogFacadeService } from 'src/app/core/services/catalog/catalog-facade.service'
import { ISubCategory } from 'src/app/shared/models/subcategory.model'

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss']
})
export class SubcategoriesListComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription

  categoryId: string = ''

  category?: ISubCategory

  subcategories: ISubCategory[] = []

  constructor(
    private route: ActivatedRoute,
    private catalogFacade: CatalogFacadeService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(route => {
      this.categoryId = route.category
      this.category = this.catalogFacade.getCategory(this.categoryId)
      this.subcategories = this.catalogFacade.getSubCategories(this.categoryId)
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
