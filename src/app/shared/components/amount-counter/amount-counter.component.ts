import { ChangeDetectorRef, Component, Input } from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms'

@Component({
  selector: 'app-amount-counter',
  template: `
    <div class="counter__container">
      <button class="btn-reset" (click)="onMinus()">–</button>
      <div class="input__wrapper">
        <input
          type="number"
          [min]="0"
          [max]="max"
          class="counter-input"
          [(ngModel)]="value"
          (input)="onInput()"
          (blur)="onInput()"
        />
      </div>
      <button class="btn-reset" (click)="onAdd()">+</button>
    </div>
  `,
  styleUrls: ['./amount-counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AmountCounterComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AmountCounterComponent
    }
  ]
})
export class AmountCounterComponent implements ControlValueAccessor, Validator {
  value = 0

  touched = false

  disabled = false

  @Input() max = 100

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  writeValue(value: number): void {
    this.changeDetectorRef.detectChanges()
    if (value < 0) {
      this.value = 0
    } else if (value > this.max) {
      this.value = this.max
    } else {
      this.value = value
    }
    this.changeDetectorRef.markForCheck()
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched
  }

  onChange = (value: number) => {}

  onTouched = () => {}

  onMinus(): void {
    this.markAsTouched()
    if (!this.disabled) {
      this.writeValue((this.value -= 1))
      this.onChange(this.value)
    }
  }

  onAdd(): void {
    this.markAsTouched()
    if (!this.disabled) {
      this.writeValue((this.value += 1))
      this.onChange(this.value)
    }
  }

  onInput(): void {
    this.markAsTouched()
    if (this.value === null) return
    if (!this.disabled) {
      this.writeValue(Math.trunc(this.value))
      this.onChange(this.value)
    }
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched()
      this.touched = true
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const { value } = control
    if (value < 0) {
      return {
        mustBePositive: {
          value
        }
      }
    }
    if (value > this.max) {
      return {
        mustBeLessThanMax: {
          value,
          max: this.max
        }
      }
    }
    return null
  }
}
