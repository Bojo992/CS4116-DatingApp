import {Component, Injector} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {createCustomElement} from "@angular/elements";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {HomepageModule} from "./homepage/homepage.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginModule,
    HomepageModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}

