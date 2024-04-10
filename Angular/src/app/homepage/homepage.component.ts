import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

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
    NgIf,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent{
}
