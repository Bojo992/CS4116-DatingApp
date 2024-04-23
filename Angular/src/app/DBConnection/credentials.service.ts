import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/credentials/';
  private url = 'http://localhost/CS4116-DatingApp/DBConnection/credentials/';

  constructor(private httpClient: HttpClient) { }

  public checkCredentials(usermane: string, password: string) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "checkCredentials",
      {
        'headers': headers,
        'body': {'username': usermane, 'password': password}
      });
  }

  public getByUserId(id : any) {
    let headers = new HttpHeaders()
      .set("id", id.toString())
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByUserId", {'headers': headers});
  }

  public getByEmail(email : any) {
    let headers = new HttpHeaders()
      .set("email", email.toString())
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByEmail", {'headers': headers});
  }

  public insertCredentials(mail : any, password : any, userId : any, username: any) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "insertCredentials",
      {
        'headers': headers,
        'body': {
          'email': mail,
          'password': password,
          'userId': userId,
          'username': username
        }
      });
  }

  public deleteCredentials(userId : any) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "deleteCredentials",
      {
        'headers': headers,
        'body': {
          'userId': userId
        }
      });
  }
}
