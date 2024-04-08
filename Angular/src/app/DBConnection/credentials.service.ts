import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/credentials/';
  private url = 'http://localhost/CourseMates/CS4116-DatingApp/DBConnection/credentials/';

  constructor(private httpClient: HttpClient) { }

  public checkCredentials(usermane: string, password: string) {
    let headers = new HttpHeaders()
      .set("mail", usermane)
      .set("username", usermane)
      .set("password", password)
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "checkCredentials", {'headers': headers});
  }

  public getByUserId(id : any) {
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByUserId", {'headers': headers});
  }

  public getByEmail(email : any) {
    let headers = new HttpHeaders().set("email", email.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByEmail", {'headers': headers});
  }

  public insertCredentials(mail : any, password : any, userId : any) {
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set("mail" , mail.toString()).set("password" , password.toString()).set("userId" , userId.toString());
    return this.httpClient.get(this.url + "insertCredentials", {'headers': headers});
  }

  public deleteCredentials(userId : any) {
    let headers = new HttpHeaders().set("userId", userId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "deleteCredentials", {'headers': headers});
  }
}
