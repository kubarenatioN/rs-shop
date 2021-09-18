import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2
} from '@angular/core'

const baseClass = 'amount-color'

const colorClasses = {
  red: `${baseClass}--red`,
  blue: `${baseClass}--blue`,
  green: `${baseClass}--green`
}

@Directive({
  selector: '[appAmountChecker]'
})
export class AmountCheckerDirective implements AfterViewInit {
  @Input() appAmountChecker = 0

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setColorClass()
  }

  setColorClass(): void {
    let className = ''
    if (this.appAmountChecker < 5) {
      className = colorClasses.red
    } else if (this.appAmountChecker < 20) {
      className = colorClasses.blue
    } else {
      className = colorClasses.green
    }
    this.renderer.addClass(this.el.nativeElement, className)
  }
}
