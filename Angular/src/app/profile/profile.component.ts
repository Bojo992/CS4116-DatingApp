import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../DBConnection/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs'; // This is used to switch the route when a new parameter is passed
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../homepage/homepage.component';
import { CommonModule, NgIf } from '@angular/common';
import MatProgressSpinner from '@angular/material/progress-spinner';


interface UserDetails {
  userId: number;
  personalInfo: number;
  course: number;
  dateCreated: string;
  isAdmin: number;
  userName: string;
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ 
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent implements OnInit {
  userId: string;
  username: string;
  data: UserDetails[] = [];
  dateCreated: string = '';
  isLoading: boolean = false;
  
  
  
  
  constructor(private cookieService: CookieService, private route: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) {
    this.userId = '';
    this.username = '';
  }
  
  ngOnInit(): void {
    // Subscribe to the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || this.cookieService.get('UID');
      this.isLoading = true;
      
      if(this.userId === this.cookieService.get('UID')){
        console.log("Viewing YOUR profile");
        this.snackBar.open('Viewing your profile', 'Close',{
          duration: 2000,
          verticalPosition: 'bottom'
        })
        
      } else {
        console.log("Viewing someone else's profile with id: " + this.userId);
        this.snackBar.open('Viewing profile with userid: ', this.userId,{
          duration: 2000,
          verticalPosition: 'bottom'
        })

        
      }

      // this is such a stupid way of doing i will fix it
      this.userService.getById(this.userId).subscribe({
        next: (response: Object) => {
          this.data = response as UserDetails[];
          this.username = this.data[0].userName;
          this.dateCreated = this.data[0].dateCreated;
          this.isLoading = false;
          },
        error: (error) => {
          this.snackBar.open('Failed to load data', 'Close', {
            duration: 3000,
          });
          console.error('There was an error!', error);
        }
      });

  
    });
    

  }  
}

  
