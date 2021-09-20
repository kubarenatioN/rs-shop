import { Component, Input } from '@angular/core'

export interface IOfferItem {
  title: string
  imageUrl: string
  link: string
}

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent {
  @Input() item!: IOfferItem
}
