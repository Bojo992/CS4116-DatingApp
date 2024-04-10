import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {HttpClient} from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    NavbarComponent,
  ],
  providers: [
    HttpClient,
  ]
})
export class NavbarModule { }
