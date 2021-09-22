import { Component, OnInit } from '@angular/core'
import { LocationService } from '../../services/location.service'

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss']
})
export class LocationSelectComponent implements OnInit {
  currentLocation$ = this.location.location$

  locations = this.location.locationsList

  isOpen = false

  constructor(private location: LocationService) {}

  ngOnInit(): void {
    this.location.getLocation()
  }

  toggle(): void {
    this.isOpen = !this.isOpen
  }

  close(): void {
    this.isOpen = false
  }

  changeLocation(id: number): void {
    this.location.changeLocation(id)
    this.close()
  }
}
