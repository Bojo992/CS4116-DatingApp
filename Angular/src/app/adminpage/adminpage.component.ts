import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../DBConnection/user.service';
import {CredentialsService} from '../DBConnection/credentials.service';
import {FormControl, FormGroup} from "@angular/forms";
import moment from "moment";
import {BanService} from "../DBConnection/ban.service";
import {resetParseTemplateAsSourceFileForTest} from "@angular/compiler-cli/src/ngtsc/typecheck/diagnostics";

interface UserDetails {
  userId: number;
  personalInfo: number;
  course: number;
  dateCreated: string;
  isAdmin: number;
  userName: string;
  userEmail: string;
}

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  data: UserDetails[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
  });

  constructor(private userService: UserService, credentialService: CredentialsService, private banService: BanService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response: Object) => {
        this.data = response as UserDetails[];
      },
      error: (error) => {
        this.snackBar.open('Failed to load data', 'Close', {
          duration: 3000,
        });
        console.error('There was an error!', error);
      }
    });
  }


  banUser(userId: number) {
    let startDate = this.range.controls.start.value;
    let stringDate = startDate?.getDate() + "/" + ((startDate?.getUTCMonth() == undefined) ? undefined : startDate!.getMonth() + 1) + "/" + startDate?.getFullYear();
    this.banService.banUser(userId, '', stringDate).subscribe(() => {
      console.log(`Banning user with ID: ${userId}`);
      this.snackBar.open(`Banning user with ID: ${userId}`);
    });
    // let startDate = this.range.controls.start.value?.toString();
    // if (startDate) {
    //   let formattedDate = moment(startDate, 'DD/MM/YYYY').format('DD-MM-YYYY');
    //   console.log(`Formatted date: ${formattedDate}`); // DEBUG
    //
    // }
  }

  unBanUser(userId: number) {
    this.banService.unbanUser(userId).subscribe({
      next: (response: any) => {
        console.log(`Unbanning user with ID: ${userId}`);
        this.snackBar.open(`Unbanning user with ID: ${userId}`);
      },
      error: (error) => {
        this.snackBar.open('Failed to unban user', 'Close', {duration: 3000});
        console.error('There was an error!', error);
      }
    });
  }

  checkIfBanned(userId: number) {
    this.banService.checkIfBanned(userId).subscribe({
      next: (response: any) => {
        if (response.isBanned) {
          console.log(`User with ID: ${userId} is banned`);
          this.snackBar.open(`User with ID: ${userId} is banned`);
        } else {
          console.log(`User with ID: ${userId} is not banned`);
          this.snackBar.open(`User with ID: ${userId} is not banned`);
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to check ban status', 'Close', {duration: 3000});
        console.error('There was an error!', error);
      }
    });
  }

  changeAdminStatus(user: any) {
    this.userService.changeAdminStatus(user.userId).subscribe((res: any) => {
      user.isAdmin = !user.isAdmin;
    });
  }


  protected readonly Date = Date;
}
