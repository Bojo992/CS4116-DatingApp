import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CredentialsService } from '../DBConnection/credentials.service';
import { UserService } from '../DBConnection/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {MatSelect, MatOption} from '@angular/material/select';
import {UserCourseService} from "../DBConnection/user-course.service";
import {PersonalInfoService} from "../DBConnection/personal-info.service";

@Component({
  selector: 'app-register-stepper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelect, MatOption
  ],
  templateUrl: './registrationquiz.component.html',
  styleUrl: './registrationquiz.component.css'
})
export class RegistrationquizComponent {

  bioFormGroup: FormGroup;
  smokingFormGroup: FormGroup;
  ageFormGroup: FormGroup;
  veganFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  genderFormGroup: FormGroup;
  drinkingFormGroup: FormGroup;
  universityFormGroup: FormGroup;
  courseFormGroup: FormGroup;

  isLinear = false;
  isSmoking: boolean = false;
  isVegan: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private credentialsService: CredentialsService,
    private userService: UserService,
    private userCourseService: UserCourseService,
    private personalInfoService: PersonalInfoService,
    private cookieService: CookieService,
    private router: Router)
    {

      this.bioFormGroup = this._formBuilder.group({
        firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]]
      });

      this.smokingFormGroup = this._formBuilder.group({
        secondCtrl: [false, [Validators.required]]
      });

      this.ageFormGroup = this._formBuilder.group({
        thirdCtrl: ['', [Validators.required]]
      }),

      this.veganFormGroup = this._formBuilder.group({
        fourthCtrl: [false, Validators.required]
      });

      this.locationFormGroup = this._formBuilder.group({
        fifthCtrl: ['', Validators.required]
      });

      this.genderFormGroup = this._formBuilder.group({
        sixthCtrl: ['', Validators.required]
      });

      this.drinkingFormGroup = this._formBuilder.group({
        seventhCtrl: ['', Validators.required]
      });

      this.universityFormGroup = this._formBuilder.group({
        eighthCtrl: ['', Validators.required]
      });

      this.courseFormGroup = this._formBuilder.group({
        ninthCtrl: ['', Validators.required]
      });


    }

    fieldMatcher(formGroup: FormGroup, controlName: string, confirmControlName: string, errorMessage: string) {
      return (group: FormGroup): { [key: string]: any } | null => {
        const controlValue = formGroup.get(controlName)?.value;
        const confirmControlValue = group.get(confirmControlName)?.value;
        if (controlValue !== confirmControlValue) {
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000,
          });
          return { 'mismatch': true };
        }
        return null;
      };
    }

    onFormSubmit() {
      // const email = this.emailFormGroup.get('secondCtrl')?.value;
      let university = this.universityFormGroup.get('eighthCtrl')?.value;
      let course = this.courseFormGroup.get('ninthCtrl')?.value;

      let dinking = this.drinkingFormGroup.get("seventhCtrl")?.value;
      let gender = this.genderFormGroup.get("sixthCtrl")?.value;
      let location = this.locationFormGroup.get("fifthCtrl")?.value;
      let vegan = this.veganFormGroup.get("fourthCtrl")?.value;
      let age = this.ageFormGroup.get("thirdCtrl")?.value;
      let smoking = this.smokingFormGroup.get("secondCtrl")?.value;
      let boi = this.bioFormGroup.get("firstCtrl")?.value;

      let userId = this.cookieService.get("UID");


      this.userCourseService.insertUserCourse(university, course).subscribe(
        (response: any) => {
          this.userService.updateCourse(userId, response["data"][0].userCourseId);
        }
      );

      this.personalInfoService.insert(
        boi,
        smoking,
        age,
        vegan,
        location,
        gender,
        dinking
      ).subscribe(
        (response: any) => {
          this.userService.updatePersonalInfo(userId, response["data"][0].personalInfoId);
        }
      );
    }



  }
