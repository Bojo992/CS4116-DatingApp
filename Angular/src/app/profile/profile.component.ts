import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../DBConnection/user.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs'; // This is used to switch the route when a new parameter is passed


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent implements OnInit {
  userId: string;

  constructor(private cookieService: CookieService, private route: ActivatedRoute) {
    this.userId = '';
  }

  ngOnInit(): void {
    // Subscribe to the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || this.cookieService.get('UserId');
      
      if(this.userId === this.cookieService.get('UserId')){
        console.log("Viewing YOUR profile");
      } else {
        console.log("Viewing someone else's profile with id: " + this.userId);
      }
 
    });
  }
}