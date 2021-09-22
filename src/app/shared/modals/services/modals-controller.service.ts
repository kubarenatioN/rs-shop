import { DOCUMENT } from '@angular/common'
import {
  EventEmitter,
  Inject,
  Injectable,
  ViewContainerRef
} from '@angular/core'
import { Subscription } from 'rxjs'
import { LoginModalService } from './login-modal.service'
import { RegisterModalService } from './register-modal.service'

const BODY_DISABLED = 'disabled'

@Injectable({
  providedIn: 'root'
})
export class ModalsControllerService {
  modalSubscription!: Subscription

  entry!: ViewContainerRef

  loginModalEvent = new EventEmitter()

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private loginModal: LoginModalService,
    private registerModal: RegisterModalService
  ) {
    loginModal.openRegister$.subscribe(() => {
      this.createRegisterModal()
    })
  }

  createLoginModal(): void {
    this.handleModalPopup()
    this.modalSubscription = this.loginModal.openModal(this.entry).subscribe({
      next: data => {
        console.log('sub data', data)
      },
      complete: () => {
        this.document.body.classList.remove(BODY_DISABLED)
      }
    })
  }

  createRegisterModal(): void {
    this.handleModalPopup()
    this.modalSubscription = this.registerModal
      .openModal(this.entry)
      .subscribe({
        next: data => {
          console.log('register subscr data', data)
        },
        complete: () => {
          this.document.body.classList.remove(BODY_DISABLED)
        }
      })
  }

  setEntry(entry: ViewContainerRef): void {
    this.entry = entry
  }

  private handleModalPopup(): void {
    this.document.body.classList.add(BODY_DISABLED)
  }
}
