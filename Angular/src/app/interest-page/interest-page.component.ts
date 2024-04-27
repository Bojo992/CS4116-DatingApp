import {Component, Inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectTrigger} from "@angular/material/select";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatSlider, MatSliderRangeThumb} from "@angular/material/slider";
import {UniversityService} from "../DBConnection/university.service";
import {Course} from "../DBClasses/Course";
import {CourseService} from "../DBConnection/course.service";
import {University} from "../DBClasses/University";
import {PersonalInterestService} from "../DBConnection/personal-interest.service";
import {InterestService} from "../DBConnection/interest.service";
import {CookieService} from "ngx-cookie-service";
import {TypeInterestEnum} from "./InterestTypes/TypeInterestEnum";
import {UserInterest} from "../DBClasses/UserInterest";

@Component({
  selector: 'app-interest-page',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    MatIcon,
    FormsModule,
    MatIconButton,
    MatSuffix,
    MatInput,
    MatButton,
    MatSlider,
    MatSliderRangeThumb,
    NgForOf,
    MatSelectTrigger
  ],
  templateUrl: './interest-page.component.html',
  styleUrl: './interest-page.component.css'
})
export class InterestPageComponent implements OnInit{
  userId: number = +this.cookiesServes.get("UID");
  universities: University[] = [];
  courses: Course[] = [];
  coursesFiltered: Course[] = [];
  userInterest: UserInterest = new UserInterest();
  universityId: number = -1;
  courseId: number = -1;
  genderId: number = -1;
  drinkingId: number = -1;
  smokingId: number = -1;
  veganId: number = -1;
  maxAge: number = 120;
  minAge: number = 18;

  constructor(
    private cookiesServes: CookieService,
    private universityService: UniversityService,
    private courseService: CourseService,
    private interestService: InterestService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    console.log(this.document.location.pathname);

    this.universityService.getAll().subscribe(
      (response: any) => {
        this.universities = [];

        for (let responseElement of response) {
          let university = University.parse(responseElement);
          this.universities.push(university);
        }
      }
    );

    this.courseService.getAll().subscribe(
      (response: any) => {
        this.courses = [];

        for (let responseElement of response) {
          let course = Course.parse(responseElement);
          this.courses.push(course);
        }
      }
    );

    this.interestService.getUserInterest(this.cookiesServes.get("UID")).subscribe(
      (res: any) => {
        this.userInterest = UserInterest.parse(res);
        console.log(this.userInterest);

        this.universityId = this.userInterest.university;
        this.courseId = this.userInterest.course;
        this.genderId = this.userInterest.gender;
        this.drinkingId = this.userInterest.drinking;
        this.smokingId = this.userInterest.smoking;
        this.veganId = this.userInterest.vegan;
        this.maxAge = this.userInterest.max_age;
        this.minAge = this.userInterest.min_age;

        this.filterCourse();
      }
    );
  }

  protected updateUniversity() {
    this.filterCourse();
    this.updateUniversityInterest();
  }

  private filterCourse() {
    this.coursesFiltered = this.courses.filter((course) => {
      return course.universityId == this.universityId;
    });
  }

  private updateUniversityInterest() {
    this.interestService.updateInterest(this.userId, TypeInterestEnum.UNIVERSITY, this.universityId).subscribe(
      (res: any) =>
      {});
  }

  protected updateCourseInterest() {
    this.interestService.updateInterest(this.userId, TypeInterestEnum.COURSE, this.courseId).subscribe(
      (res: any) =>
      {});
  }

  protected updateGenderInterest() {
    this.interestService.updateInterest(this.userId, TypeInterestEnum.GENDER, this.genderId).subscribe(
      (res: any) =>
      {});
  }

  protected updateDrinkingInterest() {
    this.interestService.updateInterest(this.userId, TypeInterestEnum.DRINKING, this.drinkingId).subscribe(
      (res: any) =>
      {});
  }

  protected updateSmokingInterest() {
    this.interestService.updateInterest(this.userId, TypeInterestEnum.SMOKING, this.smokingId).subscribe(
      (res: any) =>
      {});
  }

  protected updateVeganInterest() {
    this.interestService.updateInterest(this.userId, TypeInterestEnum.VEGAN, this.veganId).subscribe(
      (res: any) =>
      {});
  }

  protected updateAgeRangeInterest() {
    this.interestService.updateInterest(this.userId, TypeInterestEnum.MAX_AGE, this.maxAge).subscribe(
      (res: any) =>
      {});
    this.interestService.updateInterest(this.userId, TypeInterestEnum.MIN_AGE, this.minAge).subscribe(
      (res: any) =>
      {});
  }

  protected clearAgeRangeInterest() {
    this.minAge = 18;
    this.maxAge = 120;

    this.interestService.updateInterest(this.userId, TypeInterestEnum.MAX_AGE, this.maxAge).subscribe(
      (res: any) =>
      {});
    this.interestService.updateInterest(this.userId, TypeInterestEnum.MIN_AGE, this.minAge).subscribe(
      (res: any) =>
      {});
  }
}
