import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { CategoryPageRoutingModule } from './category-page-routing.module'
import { CategoryPageComponent } from './category-page.component'
import { ProductCardComponent } from './components/product-card/product-card.component'
import { SortbarComponent } from './components/sortbar/sortbar.component'
import { ProductsListComponent } from './pages/products-list/products-list.component'
import { SubcategoriesListComponent } from './pages/subcategories-list/subcategories-list.component'
import { SortPipe } from './pipes/sort.pipe'

@NgModule({
  declarations: [
    CategoryPageComponent,
    SubcategoriesListComponent,
    ProductsListComponent,
    ProductCardComponent,
    SortbarComponent,
    SortPipe
  ],
  imports: [CommonModule, SharedModule, CategoryPageRoutingModule]
})
export class CategoryPageModule {}
