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
  @Input()
  test!: User | null;
  userSubscription: Subscription | undefined;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
    // Fetch all users
    this.userService.getAll().subscribe((users: any) => {
      for (let i of users) {
        this.users.push(i);
      }
    });
  }

  clickLike(): void {
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
      this.snackBar.open('No more profiles to load','Close',{
        duration: 2000,
        verticalPosition: 'bottom'
      })
      console.log('No more profiles to load');
    }
  }

  protected readonly ProfileComponent = ProfileComponent;
}

