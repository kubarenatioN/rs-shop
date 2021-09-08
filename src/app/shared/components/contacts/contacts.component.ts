import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  @Input() isCollapsed = false

  isVisible = false

  toggle(): void {
    this.isVisible = !this.isVisible
  }

  close(): void {
    this.isVisible = false
  }
}
