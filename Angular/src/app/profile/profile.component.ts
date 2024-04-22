import {Component, Input, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../DBConnection/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileService } from '../DBConnection/profile.service';
import { User } from '../navbar/navbar.component';



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

  constructor(private cookieService: CookieService, private route: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar, private profileService: ProfileService) {
    this.userId = '';
    this.username = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = (this.userProfile != null) ? this.userProfile.userId.toString() : (params.get('id') || this.cookieService.get('UID'));

      this.isLoading = true;

      if (this.userId === this.cookieService.get('UID')) {
        console.log("Viewing YOUR profile");
        this.myprofile = true;
        this.snackBar.open('Viewing your profile', 'Close', {
          duration: 2000,
          verticalPosition: 'bottom'
        });
      } else {
        console.log("Viewing someone else's profile with id: " + this.userId);
        this.myprofile = false;
        this.snackBar.open('Viewing profile with userid: ', this.userId, {
          duration: 2000,
          verticalPosition: 'bottom'
        });
      }

      this.loadProfileData(this.userId);
      console.log('loading data for userid ' + this.userId)
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
