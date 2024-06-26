import { Component, OnInit } from '@angular/core';
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
import {Router, RouterLink} from '@angular/router';
import {MatSelect, MatOption} from '@angular/material/select';
import {UserCourseService} from "../DBConnection/user-course.service";
import {PersonalInfoService} from "../DBConnection/personal-info.service";
import { Course } from '../DBClasses/Course';
import { University } from '../DBClasses/University';
import { UniversityService } from '../DBConnection/university.service';
import { CourseService } from '../DBConnection/course.service';
import {NgForOf, NgIf} from "@angular/common";
import {InterestService} from "../DBConnection/interest.service";
import {UserInterest} from "../DBClasses/UserInterest";
import {InterestPageComponent} from "../interest-page/interest-page.component";


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
    MatSelect, MatOption,
    NgForOf, NgIf, InterestPageComponent, RouterLink
  ],
  templateUrl: './registrationquiz.component.html',
  styleUrl: './registrationquiz.component.css'
})
export class RegistrationquizComponent implements OnInit {

  bioFormGroup: FormGroup;
  smokingFormGroup: FormGroup;
  ageFormGroup: FormGroup;
  veganFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  genderFormGroup: FormGroup;
  drinkingFormGroup: FormGroup;
  universityFormGroup: FormGroup;
  courseFormGroup: FormGroup;

  protected universities: University[];
  protected courses: Course[];
  protected coursesFiltered = new Array<Course>();
  protected universitySelected: number = 0;
  protected courseSelected = 0;
  protected displayInterest: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private userCourseService: UserCourseService,
    private personalInfoService: PersonalInfoService,
    private cookieService: CookieService,
    protected router: Router,
    private universityService: UniversityService,
    private courseService: CourseService,
    private interestService: InterestService

  )
    {
      this.universities = new Array<University>();
      this.courses = new Array<Course>();

      this.bioFormGroup = this._formBuilder.group({
        firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]]
      });

      this.smokingFormGroup = this._formBuilder.group({
        secondCtrl: [false, [Validators.required]]
      });

      this.ageFormGroup = this._formBuilder.group({
        thirdCtrl: ['', [Validators.required]]
      });

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
    ngOnInit(): void {

      this.universityService.getAll().subscribe(
        (response: any) => {
          this.universities = new Array()

          for (let responseElement of response) {
            let university = University.parse(responseElement);
            this.universities.push(university);
          }
        }
      )

      this.courseService.getAll().subscribe(
        (response: any) => {
          this.courses = new Array()

          for (let responseElement of response) {
            let course = Course.parse(responseElement);
            this.courses.push(course);
          }
        }
      )

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

    getCoursesFormUniversity(universityId: number) {
      this.coursesFiltered = this.courses.filter((course) => {
        return course.universityId === universityId;
      });
    }

    onFormSubmit() {
      // const email = this.emailFormGroup.get('secondCtrl')?.value;
      let university = +this.universityFormGroup.get('eighthCtrl')?.value;
      let course = +this.courseFormGroup.get('ninthCtrl')?.value;
      console.log('UNIVERSITY ', university,'COURSE ',  course);
      let drinking = (this.drinkingFormGroup.get("seventhCtrl")?.value) == "True";
      let Gender = +this.genderFormGroup.get("sixthCtrl")?.value;
      let location = this.locationFormGroup.get("fifthCtrl")?.value;
      let vegan = (this.veganFormGroup.get("fourthCtrl")?.value) == "True";
      let age = this.ageFormGroup.get("thirdCtrl")?.value;
      let smoking = (this.smokingFormGroup.get("secondCtrl")?.value)  == "True";
      let bio = this.bioFormGroup.get("firstCtrl")?.value;

      let userId = this.cookieService.get("UID");

      let userInterest = new UserInterest();
      userInterest.university = university;
      userInterest.course = course;
      userInterest.gender = Gender;
      userInterest.drinking = (drinking) ? 1 : 2;
      userInterest.smoking = (smoking) ? 1 : 2;
      userInterest.vegan = (vegan) ? 1 : 2;
      userInterest.max_age = age;
      userInterest.min_age = age;

      this.interestService.setUpInterest(userInterest, +userId).subscribe((res: any) => {});

       this.userCourseService.insertUserCourse(university, course).subscribe(
         (response: any) => {
           console.log('this is the response from the user course service: ',  response);
            let userCourseId = +response["data"][0].userCourseId.toString();
           console.log('this is the response from the user course service: ',  userCourseId);
           this.userService.updateCourse(+userId, userCourseId).subscribe();
         }
       );

      this.personalInfoService.insert(
        bio,
        smoking,
        age,
        vegan,
        location,
        Gender,
        drinking
      ).subscribe(
        (response: any) => {
          console.log("this is response : ", response);
          let personalInfoId = response["data"][0].personalInfoId.toString();
          console.log(userId, personalInfoId);
          this.userService.updatePersonalInfo(userId, personalInfoId).subscribe(
            (response:any) => {
              console.log("response");
              this.displayInterest = true;
            }
          );
        }
      );
    }



  }
