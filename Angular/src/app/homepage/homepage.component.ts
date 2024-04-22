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
import {UserService} from "../DBConnection/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

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

  constructor(private userService: UserService, private snackBar: MatSnackBar, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
    // Fetch all users
    this.userService.getAll().subscribe((users: any) => {
      for (let i of users) {
        if ((i.userId !== +this.cookieService.get("UID"))) {
          this.users.push(i);
        }
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
        }
      } else {
        this.snackBar.open('No more profiles to load', 'Close', {
          duration: 2000,
          verticalPosition: 'bottom'
        })
        console.log('No more profiles to load');
      }
    }
    //this.shuffleUsers();
  }

  protected readonly ProfileComponent = ProfileComponent;


}

