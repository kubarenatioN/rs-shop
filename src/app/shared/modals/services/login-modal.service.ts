import {
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  Output,
  ViewContainerRef
} from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { IUserLogin } from '../../models/user-login.model'
import { LoginModalComponent } from '../components/login-modal/login-modal.component'

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  private componentRef!: ComponentRef<LoginModalComponent>

  private componentSubscriber!: Subject<string>

  private openRegister$$ = new Subject()

  // openRegister$ = this.openRegister$$.asObservable()

  @Output() openRegister$ = new EventEmitter<void>()

  constructor(
    private resolver: ComponentFactoryResolver,
    private authService: AuthService // private modalsController: ModalsControllerService
  ) {}

  openModal(entry: ViewContainerRef): Observable<string> {
    const factory = this.resolver.resolveComponentFactory(LoginModalComponent)
    this.componentRef = entry.createComponent(factory)
    this.componentRef.instance.closeEvent.subscribe(() => this.closeModal())
    this.componentRef.instance.confirmEvent.subscribe(
      (loginData: IUserLogin) => {
        this.authService.loginUser(loginData)
        this.confirm()
      }
    )
    this.componentRef.instance.registerEvent.subscribe(() => {
      this.closeModal()
      this.openRegister$.emit()
    })
    this.componentRef.location.nativeElement.setAttribute(
      'class',
      'login-modal'
    )
    this.componentSubscriber = new Subject<string>()
    return this.componentSubscriber.asObservable()
  }

  closeModal(): void {
    this.componentSubscriber.complete()
    this.componentRef.destroy()
  }

  confirm(): void {
    // this.componentSubscriber.next('action')
    this.closeModal()
  }
}
