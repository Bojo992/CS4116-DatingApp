import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../DBConnection/user.service";



@NgModule({
  declarations: [],
  imports: [
    NavbarComponent,
  ],
  providers: [
    HttpClient,
    UserService,
  ]
})
export class NavbarModule { }
