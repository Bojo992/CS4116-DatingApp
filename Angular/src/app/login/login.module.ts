import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {CredentialsService} from "../DBConnection/credentials.service";
import { UserService } from '../DBConnection/user.service';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({

  declarations: [],
  imports: [
    LoginComponent,
    ReactiveFormsModule
  ],
  providers: [
    CredentialsService, UserService
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
