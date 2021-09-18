import { AfterContentInit, Component, Input } from '@angular/core'

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements AfterContentInit {
  @Input() rating = 0

  private max = 5

  star: number[] = []

  starFilled: number[] = []

  ngAfterContentInit(): void {
    this.star = new Array(this.max - this.rating)
    this.starFilled = new Array(this.rating)
  }
}
