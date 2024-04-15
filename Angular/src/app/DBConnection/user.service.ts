import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/user/';
  private url = 'http://localhost/CourseMates/CS4116-DatingApp/DBConnection/user/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public getById(id: any){
    let headers = new HttpHeaders()
      .set("id", id.toString())
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getById", {'headers': headers});
  }

  public insertUser(isAdmin: number, userName: any, userEmail: any){
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "insertUser",
      {
        'headers': headers,
        'body': {
          'isAdmin': isAdmin,
          'username': userName.toString(),
          'userEmail': userEmail
        }
      });
  }

  public deleteUser(id: number) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "deleteUser",
      {
        'headers': headers,
        'body': {
          'id': id
        }
      });
  }
}
