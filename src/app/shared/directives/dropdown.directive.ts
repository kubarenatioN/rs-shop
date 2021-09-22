import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core'
import { Event, Router, RouterEvent } from '@angular/router'
import { filter } from 'rxjs/operators'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Output() closeDropdown = new EventEmitter()

  @HostListener('window:click', ['$event'])
  handleClick(event: PointerEvent): void {
    // const eventEl = event.target as HTMLElement
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeDropdown.emit()
    }
  }

  constructor(private eRef: ElementRef, private router: Router) {
    this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe(() => {
        this.closeDropdown.emit()
      })
  }
}
