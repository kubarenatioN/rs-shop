import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { registerLocaleData } from '@angular/common'
import localeRu from '@angular/common/locales/ru'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { MainPageModule } from './main-page/main-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    MainPageModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
