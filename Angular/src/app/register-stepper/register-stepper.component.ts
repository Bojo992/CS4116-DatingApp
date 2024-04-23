import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CredentialsService } from '../DBConnection/credentials.service';
import { UserService } from '../DBConnection/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-stepper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './register-stepper.component.html',
  styleUrl: './register-stepper.component.css'
})
export class RegisterStepperComponent {
  usernameFormGroup: FormGroup;
  emailFormGroup: FormGroup;
  confirmEmailFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmPasswordform: FormGroup;
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private credentialsService: CredentialsService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router)
    {

      this.usernameFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });

      this.emailFormGroup = this._formBuilder.group({
        secondCtrl: ['', [Validators.required, Validators.email]]
      });

      this.confirmEmailFormGroup = this._formBuilder.group({
        thirdCtrl: ['', [Validators.required, Validators.email]]
      }, { validators: this.fieldMatcher(this.emailFormGroup, 'secondCtrl', 'thirdCtrl', 'Email mismatch') });

      this.passwordFormGroup = this._formBuilder.group({
        fourthCtrl: ['', Validators.required]
      });

      this.confirmPasswordform = this._formBuilder.group({
        fifthCtrl: ['', Validators.required]
      }, { validators: this.fieldMatcher(this.passwordFormGroup, 'fourthCtrl', 'fifthCtrl', 'Password mismatch') });
    }

    fieldMatcher(formGroup: FormGroup, controlName: string, confirmControlName: string, errorMessage: string) {
      return (group: FormGroup): { [key: string]: any } | null => {
        const controlValue = formGroup.get(controlName)?.value;
        const confirmControlValue = group.get(confirmControlName)?.value;
        if (controlValue !== confirmControlValue) {
          this.snackbar.open(errorMessage, 'Close', {
            duration: 3000,
          });
          return { 'mismatch': true };
        }
        return null;
      };
    }

    onFormSubmit() {
      if (this.usernameFormGroup.valid && this.emailFormGroup.valid && this.confirmEmailFormGroup.valid && this.passwordFormGroup.valid && this.confirmPasswordform.valid) {
        const email = this.emailFormGroup.get('secondCtrl')?.value;
        const password = this.passwordFormGroup.get('fourthCtrl')?.value;
        const username = this.usernameFormGroup.get('firstCtrl')?.value;

        this.userService.insertUser(0, username, email).subscribe(
          (response: any) => {
            console.log('this is the response from the user service: ', response)
            this.cookieService.set('UID', response['data'][0].userId, 1); // cookies expire in 1 day
            this.credentialsService.insertCredentials(email, password, response['data'][0].userId, username).subscribe(
              response => {
                console.log(response);
                this.snackbar.open('Registration successful', 'Close', {
                  duration: 3000,
                });
                this.router.navigate(['register']);
              },
              error => {
                console.error(error);
                this.snackbar.open('Registration failed', 'Close', {
                  duration: 3000,
                });

              }
            )
          }
        );
      }
    }



  }
