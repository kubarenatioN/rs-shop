import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
  }
]

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
