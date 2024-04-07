import {Component, Injector} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {createCustomElement} from "@angular/elements";
import {HomepageComponent} from "../homepage/homepage.component";
import { CredentialsService } from "../DBConnection/credentials.service"
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

interface User {
  userId: number;
}

interface CredentialsResponse {
  data: User[];
  message: string;
  error: any; 
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private injector: Injector,
    private router: Router,
    private credentialsService: CredentialsService,
    private snackBar: MatSnackBar
  ) {
  }


  login(): void {
    this.credentialsService.checkCredentials(this.username, this.password).subscribe(
      (response: any) => {
        const credentialsResponse = response as CredentialsResponse; 
        if (credentialsResponse.data.length > 0) {
          this.goToHomepage();
          console.log('Login successful', this.username, this.password);
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
  

  goToHomepage(): void {
    this.router.navigate(['home']);
  }

  ngDoBootstrap() {
    const loginElement = createCustomElement(LoginComponent, {injector: this.injector});
    customElements.define('app-login', loginElement); // Define the custom element name
    // Convert LoginComponent to a custom element and register it with the browser

  }

  protected readonly HomepageComponent = HomepageComponent;
}
