import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {CredentialsService} from "../DBConnection/credentials.service";



@NgModule({

  declarations: [],
  imports: [
    LoginComponent
  ],
  providers: [
    CredentialsService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
