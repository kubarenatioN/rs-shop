import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core'
import { IUserLogin } from 'src/app/shared/models/user-login.model'
import { RegisterModalService } from '../../services/register-modal.service'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {
  model = {
    login: '',
    password: ''
  }

  @HostListener('click', ['$event'])
  handleClick(event: PointerEvent): void {
    // console.log(event.target, this.elementRef.nativeElement)
    if (event.target === this.elementRef.nativeElement) {
      this.close()
    }
  }

  @Output() closeEvent = new EventEmitter()

  @Output() confirmEvent = new EventEmitter<IUserLogin>()

  @Output() registerEvent = new EventEmitter()

  constructor(
    private elementRef: ElementRef,
    private registerService: RegisterModalService // private modalsController: ModalsControllerService
  ) {}

  ngOnInit(): void {
    console.log('login modal init!')
  }

  ngOnDestroy(): void {
    console.log('login modal destroyed')
  }

  close(): void {
    this.closeEvent.emit()
  }

  confirm(): void {
    this.confirmEvent.emit(this.model)
  }

  register(): void {
    this.registerEvent.emit()
  }
}
