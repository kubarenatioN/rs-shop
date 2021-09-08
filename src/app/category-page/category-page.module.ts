import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CategoryPageRoutingModule } from './category-page-routing.module'
import { CategoryPageComponent } from './category-page.component'
import { SubcategoriesListComponent } from './pages/subcategories-list/subcategories-list.component'
import { ProductsListComponent } from './pages/products-list/products-list.component'
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SortbarComponent } from './components/sortbar/sortbar.component';
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
  imports: [CommonModule, CategoryPageRoutingModule]
})
export class CategoryPageModule {}
