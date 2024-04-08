import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomepageComponent} from "./homepage.component";
import {UniversityService} from "../DBConnection/university.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomepageComponent
  ],
  providers: [
    UniversityService
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule { }
