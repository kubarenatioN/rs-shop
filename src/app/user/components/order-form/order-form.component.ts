import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { NgModel } from '@angular/forms'
import { IOrderDetails } from 'src/app/shared/models/order-item.model'

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, AfterContentInit {
  model: IOrderDetails = {
    name: '',
    address: '',
    phone: '',
    timeToDeliver: '',
    comment: ''
  }

  minDate!: Date

  maxDate!: Date

  @Input() hasCancelBtn = true

  @Input() canSubmit = false

  @Input() prevDetails?: IOrderDetails

  @Output()
  cancelOrderEvent = new EventEmitter<void>()

  @Output()
  submitOrderEvent = new EventEmitter<IOrderDetails>()

  ngOnInit(): void {
    const currentYear = new Date().getFullYear()
    this.minDate = new Date()
    this.maxDate = new Date(currentYear, 11, 31)
  }

  ngAfterContentInit(): void {
    if (this.prevDetails !== undefined) {
      this.model = this.prevDetails
    }
  }

  cancelOrder(): void {
    this.cancelOrderEvent.emit()
  }

  onSubmit(): void {
    this.submitOrderEvent.emit(this.model)
  }

  getPhoneErrorMessage(phone: NgModel): string {
    if (phone.hasError('required')) {
      return 'Обяззательное поле.'
    }
    if (phone.hasError('pattern')) {
      return 'Неверный формат номера'
    }
    return ''
  }

  validatePhoneRequired(phone: NgModel): boolean | null {
    const res =
      (phone.control.errors !== null &&
        phone.control.errors.required === undefined) ||
      phone.control.errors === null
    return res
  }

  validatePhonePattern(phone: NgModel): boolean | null {
    const res =
      (phone.control.errors !== null &&
        phone.control.errors.pattern === undefined) ||
      phone.control.errors === null
    return res
  }
}
