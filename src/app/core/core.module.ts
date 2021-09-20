import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { CatalogDropdownComponent } from './components/catalog-dropdown/catalog-dropdown.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { LocationSelectComponent } from './components/location-select/location-select.component'
import { ProfileDropdownComponent } from './components/profile-dropdown/profile-dropdown.component'
import { SearchInputComponent } from './components/search-input/search-input.component'
import { SearchResultProductComponent } from './components/search-result-product/search-result-product.component'

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileDropdownComponent,
    FooterComponent,
    CatalogDropdownComponent,
    LocationSelectComponent,
    SearchInputComponent,
    SearchResultProductComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule {}
