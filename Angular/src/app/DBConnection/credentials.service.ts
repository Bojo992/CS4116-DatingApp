import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/university/';
  private url = 'http://localhost/CourseMates/DBConnection/credentials/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public checkCredentials(usermane: string, password: string) {
    let headers = new HttpHeaders()
      .set("mail", usermane)
      .set("username", usermane)
      .set("password", password)
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "checkCredentials", {'headers': headers});
  }

  public getById(id: any){
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getById", {'headers': headers});
  }

  public addCredentials(name: string) {
    let headers = new HttpHeaders().set("name", name).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "insertCredentials", {'headers': headers});
  }

  public deleteCredentials(id: any) {
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "deleteCredentials", {'headers': headers});
  }
}
