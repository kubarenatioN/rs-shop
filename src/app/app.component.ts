import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core'
import { Subscription } from 'rxjs'
import { ModalsControllerService } from './shared/modals/services/modals-controller.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-shop'

  modalSubscription!: Subscription

  @ViewChild('loginModal', { read: ViewContainerRef })
  entry!: ViewContainerRef

  constructor(private modalsController: ModalsControllerService) {}

  ngAfterViewInit(): void {
    this.modalsController.setEntry(this.entry)
  }
}
