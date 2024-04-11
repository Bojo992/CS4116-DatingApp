import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../DBConnection/user.service";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    NavbarComponent, RouterModule
  ],
  providers: [
    HttpClient,
    UserService,
  ]
})
export class NavbarModule { }
