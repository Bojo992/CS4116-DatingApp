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



interface PersonalInfo {
  id: number;
  bio: string;
  smoking: number;
  age: number;
  vegan: number;
  loction: string;
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
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string;
  username: string;
  dateCreated: string = '';
  isLoading: boolean = false;
  myprofile: boolean = false;
  
  public userIdFromHomePage : number = 0;
  
  @Input() userProfile: User | null = null;
  personalInfo: PersonalInfo | null = null;
  university: University | null = null;
  course: Course | null = null;
  userCourse: UserCourse | null = null;
  Gender : string = '';
  
  constructor(private cookieService: CookieService, private route: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar, private profileService: ProfileService, private router : Router) {
    this.userId = '';
    this.username = '';
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      
      const routeUserId = params.get('id');
      console.log('JFAhdusf',routeUserId);       // Getting the user id from the route parameter
      this.userId = routeUserId ? routeUserId : (this.userProfile!.userId.toString()); 
      
      this.isLoading = true;
      this.myprofile = this.userId === this.cookieService.get('UID');
      
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
        this.snackBar.open('Edit Bio Placeholder', 'Close', {
          duration: 2000,
          verticalPosition: 'bottom'
        });
        
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
    