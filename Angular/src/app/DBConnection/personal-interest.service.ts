import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonalInterestService {
// private url = 'http://coursemates.infinityfreeapp.com/DBConnection/personalInterest/';
  private url = 'http://localhost/CourseMates/CS4116-DatingApp/DBConnection/personalInterest/';

  constructor(private httpClient: HttpClient) { }

  public getAllForTheUser(userId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId", userId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getAllForTheUser", {'headers' : headers});
  }

  public insertPersonalInterest(userId : any, interest : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId", userId.toString()).set("interest" , interest.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "insertPersonalInterest", {'headers' : headers});
  }

  public deletePersonalInterest(userId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId", userId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "deletePersonalInterest", {'headers' : headers});
  }


}
