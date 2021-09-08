import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core'
import { Observable } from 'rxjs'
import { ICategory } from 'src/app/shared/models/category.model'
import SwiperCore, { FreeMode } from 'swiper'
import { CatalogDropdownService } from '../../services/catalog-dropdown.service'
import { HeaderHttpService } from '../../services/header-http.service'

SwiperCore.use([FreeMode])

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isCatalogActive$ = this.catalogService.isActive$

  categories$?: Observable<ICategory[]>

  @ViewChild('catalogBtn') catalogBtn!: ElementRef

  @ViewChild('catalogDropdown', {
    read: ElementRef
  })
  dropdown!: ElementRef

  constructor(
    private httpService: HeaderHttpService,
    private catalogService: CatalogDropdownService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.categories$ = this.httpService.getCategories()
  }

  ngAfterViewInit(): void {
    this.renderer.listen('window', 'click', (event: PointerEvent) => {
      if (
        !this.catalogBtn.nativeElement.contains(event.target) &&
        !this.dropdown.nativeElement.contains(event.target)
      ) {
        this.catalogService.close()
      }
    })
  }

  toggleCatalogDropdown(): void {
    this.catalogService.toggle()
  }
}
