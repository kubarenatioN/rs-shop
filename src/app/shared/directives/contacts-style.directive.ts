import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

const enum ContactsStyle {
  Collapsed,
  Expanded
}

@Directive({
  selector: '[appContactsStyle]'
})
export class ContactsStyleDirective implements OnInit {

  constructor(private el: ElementRef, private renderer2: Renderer2) { }

  ngOnInit() {
    
  }

}
