import {Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';

// page routes

import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import { RegistrationquizComponent } from './registrationquiz/registrationquiz.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ProfileComponent } from './profile/profile.component';
import {AboutComponent} from "./about/about.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationquizComponent},
  { path: 'admin', component: AdminpageComponent },
  { path: 'register', component: RegistrationquizComponent},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent}
];
