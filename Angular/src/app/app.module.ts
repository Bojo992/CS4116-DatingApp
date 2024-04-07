import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    // Add LoginComponent to declarations
  ],
  imports: [
    BrowserModule,
    LoginComponent,
    AppRoutingModule
  ],
  providers: [CookieService]
})
export class AppModule {
  constructor(private injector: Injector) {
    this.ngDoBootstrap()
  }
  ngDoBootstrap() {
    // Convert LoginComponent to a custom element and register it with the browser
    const loginElement = createCustomElement(LoginComponent, { injector: this.injector });
    customElements.define('app-login', loginElement); // Define the custom element name
  }
}
