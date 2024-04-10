import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {map, Observable, startWith} from "rxjs";
import {UniversityService} from "../DBConnection/university.service";
import {AppComponent} from "../app.component";
// import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
// import {SidenavComponent} from "../sidenav/sidenav.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

export interface User {
  name: string;
  age: string;
  university: string;
  course: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    FormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgForOf,
    NgIf, 
  //  MatSidenavContainer, MatSidenav, SidenavComponent, MatIcon, MatIconButton, SidenavComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchControl = new FormControl('');
  filteredUsers: Observable<User[]> | undefined;

  users: User[] = [];

  constructor(private universityService: UniversityService) {
  }

  ngOnInit(): void {
    // Fetch universities from the database
    this.universityService.getAll().subscribe((universities: any) => {
      this.users = [
        // { name: 'John Doe', age: '25', university: universities[0]?.name , course: 'Computer Science' },
        // { name: 'Alice Smith', age: '30', university: universities[1]?.name , course: 'Physics' },
      ];

      for (let i of universities) {
        this.users.push(i);
      }
      this.filteredUsers = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(user => (user ? this.filterUsers(user) : this.users.slice()))
      )

      this.universityService.getAll().subscribe((universities: any) => {
        this.users = universities; // Assuming universities is already an array of User objects
        this.filteredUsers = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(user => (user ? this.filterUsers(user) : this.users.slice()))
        );
      });

    });
  }

  private filterUsers(value: string): User[]{

    const filterValues = this.normalizeValue(value).split(' ');
    return this.users.filter(user => {
      for (const filterValue of filterValues) {
        if (!this.normalizeValue(user.name).includes(filterValue)) {
          return false;
        }
      }
      return true;
    });


    /*const filterValue = value.toLowerCase().trim();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.age.toLowerCase().includes(filterValue) ||
      user.university.toLowerCase().includes(filterValue) ||
      user.course.toLowerCase().includes(filterValue)
    );*/
  }

  UserToString(user: User): string {
    return `${user.name}, ${user.age}, ${user.university}, ${user.course}`;
  }

  /*  private filter(value: string): string[] {
      const filterValue = this.normalizeValue(value);
      return this..filter((userList: string) => this.normalizeValue(userList).includes(filterValue));*/

  private normalizeValue(value: any) {
    return value.toLowerCase().replace(/\s/g, '');
  }

  sidebarOpened: boolean = false;
  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }
}


