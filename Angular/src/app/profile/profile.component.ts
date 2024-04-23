import {Component, Input, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../DBConnection/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileService } from '../DBConnection/profile.service';
import { User } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersonalInfoService } from '../DBConnection/personal-info.service';
import { MatSelect, MatOption } from '@angular/material/select';
import { CourseService } from '../DBConnection/course.service';
import { UserCourseService } from '../DBConnection/user-course.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

interface PersonalInfo {
  id: number;
  bio: string;
  smoking: number;
  age: number;
  vegan: number;
  location: string;
  Gender: number;
  drinking: number;
  
}

interface University {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
  universityId: number;
}

interface UserCourse {
  id: number;
  universityId: number;
  courseId: number;
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, FormsModule, MatSelect, MatOption, MatSlideToggleModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string;
  username: string;
  dateCreated: string = '';
  isLoading: boolean = false;
  myprofile: boolean = false;
  isEditBioModalOpen: boolean = false;
  isEditAgeMode: boolean = false;
  isEditLifestyleMode: boolean = false;
  
  public userIdFromHomePage : number = 0;
  
  @Input() userProfile: User | null = null;
  personalInfo: PersonalInfo | null = null;
  university: University | null = null;
  course: Course | null = null;
  userCourse: UserCourse | null = null;
  Gender : string = '';
  
  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private router : Router,
    private personalInfoService: PersonalInfoService,
    private courseService: CourseService,
    private userCourseService: UserCourseService
  ) 
    {
      this.userId = '';
      this.username = '';
    }
    
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        
        const routeUserId = params.get('id');
        console.log('JFAhdusf',routeUserId);       // Getting the user id from the route parameter
        this.userId = routeUserId ? routeUserId : (this.userProfile!.userId.toString());
        
        this.isLoading = true;
        this.myprofile = this.userId === this.cookieService.get('UID') || this.cookieService.get('isAdmin') === '1';
        
        if (this.myprofile) {
          console.log("Viewing YOUR profile");
          this.snackBar.open('Viewing your profile', 'Close', {
            duration: 2000,
            verticalPosition:
            'bottom' });
          } else {
            this.snackBar.open(`Viewing profile with userid: ${this.userId}`, 'Close', {
              duration: 2000,
              verticalPosition:
              'bottom' });
            }
            
            this.loadProfileData(this.userId);
          });
        }


        
        loadProfileData(userId: string): void {
          console.log('loading data for userid ' + this.userId)
          this.profileService.getProfileInfo(userId).subscribe({
            next: (response: any) => {
              if (response.user && response.user.length) {
                this.userProfile = response.user[0];
                console.log('loading data for userid ' + this.userId)
                this.personalInfo = response.personalInfo[0];
                console.log(this.personalInfo);
                this.university = response.university[0];
                this.course = response.course[0];
                this.userCourse = response.userCourse[0];
                this.isLoading = false;
              }
            },
            error: (error) => {
              this.snackBar.open('Failed to load data', 'Close', {
                duration: 3000,
              });
              console.error('There was an error!', error);
            }
          });
        }
        
        editBio() {
          this.toggleEditBioModal();
          this.snackBar.open('Editing your bio', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        }
          
        editAge() {
          this.toggleEditAgeMode();
          this.snackBar.open('Editing your age', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom'
          });
        }
        
        toggleEditBioModal() {
          this.isEditBioModalOpen = !this.isEditBioModalOpen;
        }
        
        toggleEditAgeMode() {
          this.isEditAgeMode = !this.isEditAgeMode;
        }

        toggleEditLifestyleMode() {
          this.isEditLifestyleMode = !this.isEditLifestyleMode;
        }


        updateLifestyle(lifestyle: string, value: boolean) {
          console.log(`The new value for ${lifestyle} is ${value}`);
          if (lifestyle === 'smoking') {
            this.personalInfoService.updateSmoking(this.personalInfo!.id, value ? 1 : 0).subscribe({
              next: () => {
                this.snackBar.open('Smoking status updated successfully', 'Close', { duration: 2000 });
                this.toggleEditLifestyleMode();
                this.loadProfileData(this.userId);
              },
              error: (error) => {
                console.error('Failed to update smoking status', error);
                this.toggleEditLifestyleMode();
              }
            });
          } else if (lifestyle === 'vegan') {
            this.personalInfoService.updateVegan(this.personalInfo!.id, value ? 1 : 0).subscribe({
              next: () => {
                this.snackBar.open('Vegan status updated successfully', 'Close', { duration: 2000 });
                this.toggleEditLifestyleMode();
                this.loadProfileData(this.userId);

              },
              error: (error) => {
                console.error('Failed to update vegan status', error);
                this.toggleEditLifestyleMode();
              }
            });
          } else if (lifestyle === 'drinking') {
            this.personalInfoService.updateDrinking(this.personalInfo!.id, value ? 1 : 0).subscribe({
              next: () => {
                this.snackBar.open('Drinking status updated successfully', 'Close', { duration: 2000 });
                this.loadProfileData(this.userId);
                this.toggleEditLifestyleMode();
              },
              error: (error) => {
                console.error('Failed to update drinking status', error);
                this.toggleEditLifestyleMode();
              }
            });
          }
        }
        
        saveBio() {
          if (this.personalInfo && this.personalInfo.bio) {
            this.personalInfoService.updateBio(this.personalInfo.id, this.personalInfo.bio).subscribe({
              next: () => {
                this.snackBar.open('Bio updated successfully', 'Close', { duration: 2000 });
                this.toggleEditBioModal();
                
              },
              error: (error) => {
                console.error('Failed to update bio', error);
                this.toggleEditBioModal();
              }
            });
          } else {
            this.snackBar.open('No changes to save', 'Close', { duration: 2000 });
          }
        }
        
        saveAge() {
          if (this.personalInfo && this.personalInfo.age) {
            this.personalInfoService.updateAge(this.personalInfo.id, this.personalInfo.age).subscribe({
              next: () => {
                this.snackBar.open('Age updated successfully', 'Close', { duration: 2000 });
                this.toggleEditAgeMode();
              },
              error: (error) => {
                console.error('Failed to update age', error);
                this.toggleEditAgeMode();
              }
            });
          } else {
            this.snackBar.open('No changes to save', 'Close', { duration: 2000 });
          }
        }

        
        
        
        
        getLifestyleIcons(): string {
          let icons = '';
          
          if (this.personalInfo?.smoking === 1) {
            icons += '<i class="fas fa-smoking"></i> ';
          }
          if (this.personalInfo?.drinking === 1) {
            icons += '<i class="fas fa-beer"></i> ';
          }
          if (this.personalInfo?.vegan === 1) {
            icons += '<i class="fa-solid fa-leaf"></i> ';
          }
             
          return icons;
        }
        
        
        
      }
      