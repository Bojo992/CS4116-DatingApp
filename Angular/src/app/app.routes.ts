import {Routes} from '@angular/router';
import { AuthGuard } from './auth.guard';

// page routes

import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";
import { RegistrationquizComponent } from './registrationquiz/registrationquiz.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ProfileComponent } from './profile/profile.component';
import {Error404Component} from "./error404/error404.component";
import {SearchPageComponent} from "./search-page/search-page.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationquizComponent},
  { path: 'admin', component: AdminpageComponent },
  { path: 'register', component: RegistrationquizComponent},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'search-page', component: SearchPageComponent, canActivate: [AuthGuard]},
  {path : '**', component: Error404Component}
];
