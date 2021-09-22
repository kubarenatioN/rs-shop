import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef
} from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/services/auth/auth.service'
import { IUserRegister } from '../../models/user-register.model'
import { RegisterModalComponent } from '../components/register-modal/register-modal.component'

@Injectable({
  providedIn: 'root'
})
export class RegisterModalService {
  private componentRef!: ComponentRef<RegisterModalComponent>

  private componentSubscriber!: Subject<string>

  constructor(
    private resolver: ComponentFactoryResolver,
    private authService: AuthService
  ) {}

  openModal(entry: ViewContainerRef): Observable<string> {
    const factory = this.resolver.resolveComponentFactory(
      RegisterModalComponent
    )
    this.componentRef = entry.createComponent(factory)
    this.componentRef.instance.closeEvent.subscribe(() => this.closeModal())
    this.componentRef.instance.confirmEvent.subscribe(
      (loginData: IUserRegister) => {
        // console.log(userData)
        this.authService.registerUser(loginData)
        this.confirm()
      }
    )
    this.componentRef.location.nativeElement.setAttribute(
      'class',
      'register-modal'
    )
    this.componentSubscriber = new Subject<string>()
    return this.componentSubscriber.asObservable()
  }

  closeModal(): void {
    this.componentSubscriber.complete()
    this.componentRef.destroy()
  }

  confirm(): void {
    this.closeModal()
  }
}
