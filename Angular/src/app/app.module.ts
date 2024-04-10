import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LoginComponent } from './login/login.component';
import { AdminModule } from './adminpage/admin.module';
import { AppRoutingModule } from "./app-routing.module";
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http'; // Use HttpClientModule

@NgModule({
  declarations: [
    LoginComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AdminModule, // Import AdminModule here
    HttpClientModule, // Ensure you import HttpClientModule for HttpClient to work
  ],
  providers: [CookieService]

})
export class AppModule {
  constructor(private injector: Injector) {
    this.ngDoBootstrap();
  }

  ngDoBootstrap() {
    // Convert LoginComponent to a custom element and register it with the browser
    const loginElement = createCustomElement(LoginComponent, { injector: this.injector });
    customElements.define('app-login', loginElement);
  }
}
