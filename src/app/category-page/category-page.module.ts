import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CategoryPageRoutingModule } from './category-page-routing.module'
import { CategoryPageComponent } from './category-page.component'
import { SubcategoriesListComponent } from './pages/subcategories-list/subcategories-list.component'
import { ProductsListComponent } from './pages/products-list/products-list.component'
import { ProductCardComponent } from './components/product-card/product-card.component'

@NgModule({
  declarations: [
    CategoryPageComponent,
    SubcategoriesListComponent,
    ProductsListComponent,
    ProductCardComponent
  ],
  imports: [CommonModule, CategoryPageRoutingModule]
})
export class CategoryPageModule {}
