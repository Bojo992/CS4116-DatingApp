import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../DBConnection/user.service';
import { CredentialsService } from '../DBConnection/credentials.service';

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
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  data: UserDetails[] = [];

  constructor(private userService: UserService, credentialService:CredentialsService, private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    this.userService.getAll().subscribe ({
      next: (response: Object) => {  
        this.data = response as UserDetails[];
        console.log(this.data);
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
    // PLACEHOLDER
    console.log(`Banning user with ID: ${userId}`);
    this.snackBar.open(`Banning user with ID: ${userId}`);
  }

  unBanUser(userId:number){
    // PLACEHOLDER
    console.log(`Banning user with ID: ${userId}`)
    this.snackBar.open(`Unban user with ID: ${userId}`);
  }

  promoteUser(userId: number) {
    // PLACEHOLDER
    console.log(`Promoting user with ID: ${userId}`);
    this.snackBar.open(`Promoting user with ID: ${userId}`);
  }
  
  demoteUser(userId: number) {
    // PLACEHOLDER
    console.log(`Demoting user with ID: ${userId}`);
    this.snackBar.open(`Demoting user with ID: ${userId}`);
  }
}
