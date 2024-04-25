import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpageComponent } from './adminpage.component';
import { UserService } from '../DBConnection/user.service';
import {MatCard} from "@angular/material/card";
import {
  MatCalendar,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatInput} from "@angular/material/input";



@NgModule({

  declarations: [AdminpageComponent],
  imports: [
    CommonModule,
    MatCard,
    MatCalendar,
    MatFormField,
    MatError,
    MatHint,
    MatLabel,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDateRangePicker,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSuffix,
    MatInput
  ],
  providers: [
    UserService,
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  exports: [
    AdminpageComponent
  ]
})
export class AdminModule { }
