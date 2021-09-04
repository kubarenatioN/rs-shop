import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  @Input() isCollapsed = false

  isVisible = false

  @HostListener('document:click', ['$event'])
  clickOutside(event: PointerEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.close()
    }
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  expand() {
    this.isVisible = !this.isVisible
  }

  close() {
    this.isVisible = false
  }

}
