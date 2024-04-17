import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchPageComponent} from "./search-page.component";
import {ProfileService} from "../DBConnection/profile.service";
import {UniversityService} from "../DBConnection/university.service";
import {CourseService} from "../DBConnection/course.service";



@NgModule({
  declarations: [],
  imports: [
    SearchPageComponent,
  ],
  providers: [
    ProfileService,
    UniversityService,
    CourseService,
  ]
})
export class SearchPageModule { }
