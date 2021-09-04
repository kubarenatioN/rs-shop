import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderHttpService } from '../../services/header-http.service';
import SwiperCore, {FreeMode} from 'swiper'
import { IPrimaryCategory } from 'src/app/shared/models/primary-category.model';
import { CatalogDropdownService } from '../../services/catalog-dropdown.service';
import { ICategory } from 'src/app/shared/models/category.model';

SwiperCore.use([FreeMode])

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCatalogActive$ = this.catalogService.isActive$

  categories$?: Observable<ICategory[]>

  constructor(private httpService: HeaderHttpService, private catalogService: CatalogDropdownService) { }

  ngOnInit(): void {
    this.categories$ = this.httpService.getCategories()
  }

  toggleCatalogDropdown() {
    this.catalogService.toggle()
  }
}
