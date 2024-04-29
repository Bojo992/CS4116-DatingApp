import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../DBConnection/user.service';
import {CredentialsService} from '../DBConnection/credentials.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import moment from "moment";
import {BanService} from "../DBConnection/ban.service";
import {resetParseTemplateAsSourceFileForTest} from "@angular/compiler-cli/src/ngtsc/typecheck/diagnostics";

class UserDetails {
  userId: number = 0;
  personalInfo: number = 0;
  course: number = 0;
  dateCreated: string = "";
  isAdmin: boolean = false;
  userName: string = "";
  userEmail: string = "";
  isBanned: boolean = false;

  public static parse(item: any) {
    let temp = new UserDetails();

    temp.userId = item.userId;
    temp.personalInfo = item.personalInfo;
    temp.course = item.course;
    temp.dateCreated = item.dateCreated;
    temp.isAdmin = item.isAdmin;
    temp.userName = item.userName;
    temp.userEmail = item.userEmail;

    return temp;
  }
}

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  data: UserDetails[] = [];
  filteredData: UserDetails[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
  });
  listFilter: FormGroup = new FormGroup({
    userName: new FormControl<string>(""),
    isBanned: new FormControl<boolean | null>(null),
    userId: new FormControl<number | null>(null)
  });

  constructor(private userService: UserService,
              credentialService: CredentialsService,
              private banService: BanService,
              private snackBar: MatSnackBar,
              formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (response: any) => {
        for(let user of response){
          this.data.push(UserDetails.parse(user));
        }

        this.banService.getAllBannedUserId().subscribe(
          (banList: any) => {
            for(let bannedUserId of banList){
              let temp = this.data.find(i => i.userId == bannedUserId.userId);
              if (temp != undefined) {temp.isBanned = true}
            }

            this.filteredData = this.data;
          }
        )
      },
      error: (error) => {
        this.snackBar.open('Failed to load data', 'Close', {
          duration: 3000,
        });
        console.error('There was an error!', error);
      }
    });
  }

  deleteUser (userId: number) {
    this.userService.deleteUser(userId).subscribe();

    this.filteredData = this.filteredData.filter((item) => {
      return item.userId != userId
    });
    this.data = this.data.filter((item) => {
      return item.userId != userId
    });
  }

  banUser(userId: number) {
    let temp = this.data.find(i => i.userId == userId);
    if (temp != undefined) {temp.isBanned = true}

    temp = this.filteredData.find(i => i.userId == userId);
    if (temp != undefined) {temp.isBanned = true}

    let startDate = this.range.controls.start.value;
    let stringDate = startDate?.getDate() + "/" + ((startDate?.getUTCMonth() == undefined) ? undefined : startDate!.getMonth() + 1) + "/" + startDate?.getFullYear();
    this.banService.banUser(userId, '', stringDate).subscribe(() => {
      console.log(`Banning user with ID: ${userId}`);
      this.snackBar.open(`Banning user with ID: ${userId}`, '', {duration: 1000});
    });
  }

  unBanUser(userId: number) {
    let temp = this.data.find(i => i.userId == userId);
    if (temp != undefined) {temp.isBanned = false}

    temp = this.filteredData.find(i => i.userId == userId);
    if (temp != undefined) {temp.isBanned = false}

    this.banService.unbanUser(userId).subscribe({
      next: (response: any) => {
        console.log(`Unbanning user with ID: ${userId}`);
        this.snackBar.open(`Unbanning user with ID: ${userId}`, '', {duration: 1000});
      },
      error: (error) => {
        this.snackBar.open('Failed to unban user', '', {duration: 1000});
        console.error('There was an error!', error);
      }
    });
  }

  changeAdminStatus(user: any) {
    this.userService.changeAdminStatus(user.userId).subscribe((res: any) => {
      user.isAdmin = !user.isAdmin;
    });
  }

  filterUsers() {
    let userName = this.listFilter.get("userName")?.value;
    let isBanned = this.listFilter.get("isBanned")?.value;
    let userId = this.listFilter.get("userId")?.value;

    console.log(userId);

    this.filteredData = this.data.filter((item) => {
      return (userName == null || item.userName.toLowerCase().includes(userName.toLowerCase())) &&
        (userId == null || userId == "" || item.userId == userId) &&
        (isBanned == null || item.isBanned == isBanned)
    });
  }

  clearFilter() {
    this.listFilter.get("userName")?.reset(null);
    this.listFilter.get("isBanned")?.reset(null);
    this.listFilter.get("userId")?.reset(null);

    this.filteredData = this.data;
  }
}
