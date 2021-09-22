import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from '@angular/core'
import { IUserLogin } from 'src/app/shared/models/user-login.model'

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  model = {
    firstName: '',
    lastName: '',
    login: '',
    password: ''
  }

  @HostListener('click', ['$event'])
  handleClick(event: PointerEvent): void {
    if (event.target === this.elementRef.nativeElement) {
      this.close()
    }
  }

  @Output() closeEvent = new EventEmitter()

  @Output() confirmEvent = new EventEmitter<IUserLogin>()

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log('register modal init!')
  }

  ngOnDestroy(): void {
    console.log('register modal destroyed')
  }

  close(): void {
    this.closeEvent.emit()
  }

  confirm(): void {
    this.confirmEvent.emit(this.model)
  }
}
