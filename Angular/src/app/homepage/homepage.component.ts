import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {map, Observable, startWith} from "rxjs";

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
    AsyncPipe
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  control = new FormControl('');
  userList: string[] = ['_User1','.User2','-User3']; //TODO: DB connection here for list of users
  filteredUsers: Observable<string[]> | undefined;
  ngOnInit(): void {
    this.filteredUsers = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.userList.filter(userList => this.normalizeValue(userList).includes(filterValue));

  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
