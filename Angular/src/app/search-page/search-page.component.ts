import {Component, OnInit} from '@angular/core';
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from "@angular/material/slider";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {Form, FormBuilder, FormControl, FormGroup, FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {Profile} from "../DBClasses/Profile";
import {ProfileService} from "../DBConnection/profile.service";
import {UniversityService} from "../DBConnection/university.service";
import {CourseService} from "../DBConnection/course.service";
import {University} from "../DBClasses/University";
import {Course} from "../DBClasses/Course";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {User} from "../navbar/navbar.component";
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    MatSlider,
    MatSliderThumb,
    MatSliderRangeThumb,
    MatSelect,
    MatLabel,
    MatOption,
    MatFormField,
    MatInput,
    FormsModule,
    MatIcon,
    NgForOf,
    MatButton,
    MatTable,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatRow,
    MatHeaderRow,
    MatCell,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit{
  value: string;
  protected profiles: Profile[];
  protected universities: University[];
  protected courses: Course[];
  protected usernameSelected = '';
  protected universitySelected = 0;
  protected courseSelected = 0;
  protected genderSelected: number = -1;
  protected isDrinking: number = -1;
  protected isSmoking: number = -1;
  protected isVegan: number = -1;
  protected minAge = 18;
  protected maxAge = 120;
  protected coursesFiltered = new Array<Course>();
  protected profilesFiltered = new Array<Profile>();
  protected displayedColumns: string[] = ['username', 'age', 'university', 'course', 'profileButton'];

  constructor(private profileService: ProfileService,
              private universityService: UniversityService,
              private courseService: CourseService,
              protected router: Router
              ) {
    this.value = '';
    this.profiles = new Array<Profile>();
    this.universities = new Array<University>();
    this.courses = new Array<Course>();
  }

  ngOnInit(): void {
    this.profileService.getAllUserProfileInfo().subscribe(
      (response : any) => {
        this.profiles = new Array()

        for (let responseElement of response) {
          let profile = Profile.parse(responseElement);
          this.profiles.push(profile);
        }

        this.profilesFiltered = this.profiles;
      }
    )

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

  formatLabel(value: number): string {
    return `${value.toString()}`
  }

  protected readonly parseInt = parseInt;

  getCoursesFormUniversity(universityId: number) {
    this.coursesFiltered = this.courses.filter((course) => {
      return course.universityId === universityId;
    });
  }

  filterUsers() {
    this.profilesFiltered = this.profiles.filter((profile : Profile) => {
      return (
        (profile.age >= this.minAge && profile.age <= this.maxAge) &&
        (this.universitySelected == 0 || profile.universityId == +this.universitySelected) &&
        (this.courseSelected == 0 || profile.courseId == +this.courseSelected) &&
        (this.genderSelected == -1 || profile.gender == this.genderSelected) &&
        ((this.isDrinking == -1) || (profile.drinking == (1 == this.isDrinking))) &&
        ((this.isSmoking == -1) || (profile.smoking == (1 == this.isSmoking))) &&
        ((this.isVegan == -1) || (profile.vegan == (1 == this.isVegan))) &&
        (this.usernameSelected == '' || profile.userName.toLowerCase().includes(this.usernameSelected.toLowerCase()))
      );
    })
  }

  crearFilter() {
    this.profilesFiltered = this.profiles;
    this.usernameSelected = '';
    this.universitySelected = 0;
    this.courseSelected = 0;
    this.genderSelected = -1;
    this.isDrinking = -1;
    this.isSmoking = -1;
    this.isVegan = -1;
    this.minAge = 18;
    this.maxAge = 120;
  }

  gotoProfile(row: any) {
    console.log("test");
    this.router.navigate(['/profile', row.userId]);
  }
}
