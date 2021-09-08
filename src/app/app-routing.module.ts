import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainComponent } from './main-page/pages/main/main.component'

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'category',
    loadChildren: () =>
      import('./category-page/category-page.module').then(
        m => m.CategoryPageModule
      )
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./details-page/details-page.module').then(
        m => m.DetailsPageModule
      )
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
