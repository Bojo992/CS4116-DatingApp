import {Component, Injector} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {NavbarComponent} from "./navbar/navbar.component";
//import {SidenavComponent} from "./sidenav/sidenav.component";
import { AdminModule } from './adminpage/admin.module';
import {SearchPageModule} from "./search-page/search-page.module";
import {SearchPageComponent} from "./search-page/search-page.component";
import {AboutComponent} from "./about/about.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginModule,
    AdminModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    NavbarComponent,
//    SidenavComponent,
    HttpClientModule,
    SearchPageModule,
    SearchPageComponent,
    AboutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}

