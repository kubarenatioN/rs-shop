import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CategoryPageComponent } from './category-page.component'
import { ProductsListComponent } from './pages/products-list/products-list.component'
import { SubcategoriesListComponent } from './pages/subcategories-list/subcategories-list.component'

const routes: Routes = [
  {
    path: '',
    component: CategoryPageComponent,
    children: [
      {
        path: ':category',
        component: SubcategoriesListComponent
      },
      {
        path: ':category/:subcategory',
        component: ProductsListComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryPageRoutingModule {}
