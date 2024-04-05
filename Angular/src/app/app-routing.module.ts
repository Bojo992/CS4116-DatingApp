import {routes} from "./app.routes";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from "./homepage/homepage.component";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    //^^imports
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    LoginComponent,
    HomepageComponent,
    // Import RouterModule with defined routes
  ],
  /*entryComponents: [
    LoginComponent // Add LoginComponent as entry component
  ]*/
  exports: [
    [RouterModule]
  ]
})
export class AppRoutingModule { }
