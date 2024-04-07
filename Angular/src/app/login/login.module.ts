import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {CredentialsService} from "../DBConnection/credentials.service";
import { UserService } from '../DBConnection/user.service';



@NgModule({

  declarations: [],
  imports: [
    LoginComponent
  ],
  providers: [
    CredentialsService, UserService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
