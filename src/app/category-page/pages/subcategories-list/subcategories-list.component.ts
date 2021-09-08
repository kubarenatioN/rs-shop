import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss']
})
export class SubcategoriesListComponent implements OnInit, OnDestroy {
  private routeSubscription!: Subscription

  category: string = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(route => {
      this.category = route.category
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
