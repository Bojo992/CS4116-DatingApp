import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../DBConnection/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs'; // This is used to switch the route when a new parameter is passed
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent implements OnInit {
  userId: string;

  constructor(private cookieService: CookieService, private route: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) {
    this.userId = '';
  }

  ngOnInit(): void {
    // Subscribe to the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || this.cookieService.get('UID');
      
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
 
    });
  }
}