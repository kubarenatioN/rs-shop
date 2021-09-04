import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main-page/pages/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  { path: 'list', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
