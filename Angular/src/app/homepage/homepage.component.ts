import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ProfileComponent} from "../profile/profile.component";
import {map, Observable, startWith, Subscription} from "rxjs";
import {ProfileService} from "../DBConnection/profile.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatchingService} from "../DBConnection/matching.service";

interface User {
  userId: number,
  personalinfo: number,
  course: number,
  isAdmin: boolean,
  userName: string,
  userEmail: string,
  dateCreated: string
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    ProfileComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  index = 0;
  users: User[] = [];
  duplicatedUsers: User[] = [];
  @Input()
  test!: User | null;

  constructor(private matchingService: MatchingService ,private profileService: ProfileService, private snackBar: MatSnackBar, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
    // Fetch all users
    let userId = +this.cookieService.get('UID')
    this.profileService.getSuggestionForUser(userId).subscribe((users: any) => {
      console.log("test bojo", userId, users);
      for (let i of users) {
        this.users.push(i);
        console.log(i);
      }
    });

    const profileComponent = document.querySelector('app-profile') as any;
    if (profileComponent) {
      profileComponent.loadProfileData(this.users[0].userId);
    }
  }

  shuffleUsers(): void {
    let counter = this.users.length;

    while (counter > 0) {
      counter--;
      let index = Math.floor(Math.random() * counter);
      [this.users[counter], this.users[index]] = [this.users[index], this.users[counter]];
    }
  }

  clickLike(): void {
    this.matchingService.like(this.cookieService.get('UID'), this.users[this.index].userId).subscribe((result: any) => {
      console.log("like response", result);

      if (result) {
        this.snackBar.open('Like successful', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
        console.log("Like was successful");
      } else {
        this.snackBar.open('Match was found', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
        console.log("Like was not successful");
      }
    });

    if (this.users.length === 0) {
      console.log('No profile found');
      this.snackBar.open('No more profiles to load', 'Close', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    } else {
      // Move to the next profile
      if (this.index < this.users.length - 1) {

        this.index++;
        const nextUserId = this.users[this.index].userId;
        // Call the loadProfileData method of ProfileComponent
        const profileComponent = document.querySelector('app-profile') as any;
        if (profileComponent) {
          profileComponent.loadProfileData(nextUserId);
          /*this.shuffleUsers();
          this.users.splice(this.index, 1);*/
        }
      } else {
        this.snackBar.open('No more profiles to load', 'Close', {
          duration: 2000,
          verticalPosition: 'bottom'
        })
        console.log('No more profiles to load');
      }
    }
  }

  clickDislike(): void {
    this.matchingService.dislike(this.cookieService.get('UID'), this.users[this.index].userId).subscribe((result : any) => {
      console.log(result);

      if (result) {
        this.snackBar.open('Dislike successful','Close',{
          duration: 3000,
          verticalPosition: 'bottom'
        })
        console.log("Dislike was successful");
      } else {
        this.snackBar.open('Dislike unsuccessful','Close',{
          duration: 3000,
          verticalPosition: 'bottom'
        })
        console.log("Dislike was not successful");
      }
    });

    if (this.users.length === 0) {
      console.log('No profile found');
      this.snackBar.open('No more profiles to load', 'Close', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    } else {
      // Move to the next profile
      if (this.index < this.users.length - 1) {

        this.index++;
        const nextUserId = this.users[this.index].userId;
        // Call the loadProfileData method of ProfileComponent
        const profileComponent = document.querySelector('app-profile') as any;
        if (profileComponent) {
          profileComponent.loadProfileData(nextUserId);
          /*this.shuffleUsers();
          this.users.splice(this.index, 1);*/
        }
      } else {
        this.snackBar.open('No more profiles to load', 'Close', {
          duration: 2000,
          verticalPosition: 'bottom'
        })
        console.log('No more profiles to load');
      }
    }
  }

  protected readonly ProfileComponent = ProfileComponent;


}

