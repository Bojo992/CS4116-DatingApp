import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatDrawer, MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NavigationEnd, NavigationStart, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {UserService} from "../DBConnection/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbar,
    MatIcon,
    MatSidenavContainer,
    MatNavList,
    MatSidenav,
    MatListItem,
    NgForOf,
    MatIconButton,
    MatButton,
    RouterLinkActive,
    RouterLink,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    NgClass,
    NgIf
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  @Input() isVisible: boolean = false;
  opened = false;

  constructor(private cookieService: CookieService, private router: Router) {
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('UID');
  }

  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate(["login"]);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) =>{
      if (event instanceof NavigationStart) {
        this.opened = false;
      }
      if (event instanceof NavigationEnd) {
        this.opened = false;
      }
    })
  }

  isLoggedOut() {
    return this.cookieService.get('UID') == '';
  }
}
