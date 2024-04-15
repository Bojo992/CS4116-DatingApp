import {Component, Injector} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {createCustomElement} from "@angular/elements";
import {HomepageComponent} from "../homepage/homepage.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';


import { CredentialsService } from "../DBConnection/credentials.service"
import { UserService } from '../DBConnection/user.service';
import {RegistrationComponent} from "../registration/registration.component";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

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
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    RegistrationComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

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
    private injector: Injector,
    private router: Router,
    private credentialsService: CredentialsService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }


  login(): void {
    this.credentialsService.checkCredentials(this.username, this.password).subscribe(
      (response: any) => {
        const credentialsResponse = response as CredentialsResponse;
        if (credentialsResponse.data.length > 0) {
          const userUid = credentialsResponse.data[0].userId;
          this.cookieService.set('UID', userUid.toString(), 1); // cookies expire in 1 day
          this.checkifAdmin(userUid);
          this.goToHomepage();

          console.log('Login successful', this.username, this.password);
          this.snackBar.open('Success! Logging in as: ', this.username, {
            duration: 2000,
            verticalPosition: 'bottom'
          })

        } else {

          console.error('Login failed: No data returned', this.username, this.password);
          this.snackBar.open('Incorrect username or password', 'Close', {
            duration: 3000,
            verticalPosition: 'top'

          });
        }
      },
      (error) => {
        console.error('Login request failed', error);
        this.snackBar.open('An error occurred during login', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }
  // this is currently returning all users... We need to fix this, api does not account for unique

  checkifAdmin(userId: any) {
    console.log('userid is : ' , userId)
    this.userService.getById(userId).subscribe(
      (response: any) => {
        const userDetails = response[0] as UserDetails;

        if(userDetails.isAdmin === 1){
          console.log('IM AN ADMIN' , userDetails.isAdmin);
          this.goToAdminPage();
          this.cookieService.set('isAdmin', userDetails.isAdmin.toString(), 1);

        }else{

          console.log('im not an admin', userDetails.isAdmin);
        }
      }
    )

  }


  goToHomepage(): void {
    this.router.navigate(['home']);
  }

  goToAdminPage():void{
    this.router.navigate(['admin']);
  }

  ngDoBootstrap() {
    const loginElement = createCustomElement(LoginComponent, {injector: this.injector});
    customElements.define('app-login', loginElement); // Define the custom element name
    // Convert LoginComponent to a custom element and register it with the browser

  }

  protected readonly HomepageComponent = HomepageComponent;
  protected readonly console = console;
  protected readonly RegistrationComponent = RegistrationComponent;
}
