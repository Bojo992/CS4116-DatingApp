import {Component, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatDrawer, MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

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
    MatLabel
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent{
  @ViewChild(MatDrawer) drawer: MatDrawer | undefined;

  toggleSidebar() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
