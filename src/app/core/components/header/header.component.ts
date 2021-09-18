import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core'
import SwiperCore, { FreeMode } from 'swiper'
import { CatalogDropdownService } from '../../services/catalog-dropdown.service'
import { CatalogFacadeService } from '../../services/catalog/catalog-facade.service'

SwiperCore.use([FreeMode])

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  isCatalogActive$ = this.catalogService.isActive$

  categories$ = this.catalogFacade.baseCategories$

  @ViewChild('catalogBtn') catalogBtn!: ElementRef

  @ViewChild('catalogDropdown', {
    read: ElementRef
  })
  dropdown!: ElementRef

  constructor(
    private catalogService: CatalogDropdownService,
    private renderer: Renderer2,
    private catalogFacade: CatalogFacadeService
  ) {}

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
