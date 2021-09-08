import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HeaderComponent } from './components/header/header.component'
import { SharedModule } from '../shared/shared.module'
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component'
import { FooterComponent } from './components/footer/footer.component'
import { CatalogDropdownComponent } from './components/catalog-dropdown/catalog-dropdown.component'

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileDropdownComponent,
    FooterComponent,
    CatalogDropdownComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule {}
