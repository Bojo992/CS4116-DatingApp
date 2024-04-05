import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomepageComponent} from "./homepage/homepage.component";

export const routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomepageComponent}
];
