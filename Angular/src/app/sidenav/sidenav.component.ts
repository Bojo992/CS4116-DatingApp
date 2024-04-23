import {Component, Input, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatDrawer, MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
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
export class SidenavComponent{
  @Input() isVisible: boolean = false;
  opened = false;

  constructor(private cookieService: CookieService) {
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('UID');
  }

  logout(): void {
    this.cookieService.deleteAll();
    window.location.reload();
  }
}