import {Component, Injector} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {CredentialsService} from "../DBConnection/credentials.service";
import {UserService} from "../DBConnection/user.service";

interface User {
  userId: number;
}

interface CredentialsResponse {
  data: User[];
  message: string;
  error: any;
}

interface UserDetails {
  userId: number;
  personalInfo: number;
  course: number;
  dateCreated: string;
  isAdmin: number;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  username: string = '';
  password: string = '';
  id: any = '';
  registerForm = this.formBuilder.group({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private credentialsService: CredentialsService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  registerUser() {
    console.log("attempt to reg");
    if (this.registerForm.value.password == this.registerForm.value.passwordConfirm
      && this.registerForm.value.passwordConfirm != ''
      && this.registerForm.value.password != ''
      && this.registerForm.value.email != ''
      && this.registerForm.value.userName != ''
    ) {
      this.userService.insertUser(0, this.registerForm.value.userName, this.registerForm.value.email).subscribe(
        (resp: any) => {
          console.log(resp);
          console.log(resp.data[0].userId);
          this.credentialsService.insertCredentials(
            this.registerForm.value.email,
            this.registerForm.value.password,
            resp.data[0].userId,
            this.registerForm.value.userName).subscribe(
            () => {
            },
            (error) => {
              console.log("failed to insert credentials")
            }
          );
          this.cookieService.set('UID', resp.data[0].userId.toString(), 1); // cookies expire in 1 day
          console.log("inserted credentials");
          this.router.navigate(["register"]);
        },
        (error) => {
          console.error('Filed to insert user request failed', error);
          this.snackBar.open('An error occurred during register', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      )
    } else {
      this.snackBar.open('You entered incorrect data', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }
  protected readonly console = console;
}



