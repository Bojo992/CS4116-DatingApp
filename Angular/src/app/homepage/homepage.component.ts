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

export interface User {
  name: string;
  age: string;
  university: string;
  course: string;
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
    NgIf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  searchControl = new FormControl('');
  filteredUsers: Observable<User[]> | undefined;

  users: User[] = [];

  constructor(private universityService: UniversityService) { }

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
    });
  }

  private filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase().trim();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(filterValue) ||
      user.age.toLowerCase().includes(filterValue) ||
      user.university.toLowerCase().includes(filterValue) ||
      user.course.toLowerCase().includes(filterValue)
    );
  }

  UserToString(user: User): string {
    return `${user.name}, ${user.age}, ${user.university}, ${user.course}`;
  }

  /*private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.userList.filter(userList => this.normalizeValue(userList).includes(filterValue));

  }*/

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
