import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/user/';
  private url = 'http://localhost/CourseMates/DBConnection/user/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public getById(id: any){
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getById", {'headers': headers});
  }

  public insertUser(isAdmin: any){
    let headers = new HttpHeaders().set("isAdmin", isAdmin.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "insertUser", {'headers': headers});
  }

  public deleteUser(id: any) {
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "deleteUser", {'headers': headers});
  }
}
