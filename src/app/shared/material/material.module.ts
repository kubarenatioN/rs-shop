import { NgModule } from '@angular/core'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatInputModule } from '@angular/material/input'
import { MatSliderModule } from '@angular/material/slider'
import { MatTabsModule } from '@angular/material/tabs'

@NgModule({
  declarations: [],
  imports: [
    MatSliderModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTabsModule
  ],
  exports: [
    MatSliderModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTabsModule
  ]
})
export class MaterialModule {}
