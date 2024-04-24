import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/profile/';
  private url = 'http://localhost/CourseMates/DBConnection/profile/';

  constructor(private httpClient: HttpClient) { }

  public getProfileInfo(userId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId" , userId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getProfileInfo" , {'headers' : headers});
  }

  public getAllUserProfileInfo() {
    return this.httpClient.get(this.url + "getAllUserProfileInfo");
  }

  public getSuggestionForUser(userId: number) {
    return this.httpClient.post(this.url + "suggestionResult",
      {
        "body" : {
          "userId" : 1
        }
      }
      );
  }
}
