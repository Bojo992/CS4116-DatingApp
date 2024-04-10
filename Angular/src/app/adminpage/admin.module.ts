import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpageComponent } from './adminpage.component';
import {CredentialsService} from "../DBConnection/credentials.service";
import { UserService } from '../DBConnection/user.service';



@NgModule({

  declarations: [AdminpageComponent],
  imports: [
    CommonModule
  ],
  providers: [
    UserService
  ],
  exports: [
    AdminpageComponent
  ]
})
export class AdminModule { }
