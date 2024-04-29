import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInterest} from "../DBClasses/UserInterest";

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/interest/';
  private url = 'http://localhost/CourseMates/DBConnection/interest/';

  constructor(private httpClient: HttpClient) { }

  public insertNewInterest(typeId : any, value : any) {
    let headers : HttpHeaders = new HttpHeaders().set("typeId" , typeId.toString()).set("value" , value.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "insertNewInterest" , {'headers' : headers});
  }

  public deleteInterest(id : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "deleteInterest", {'headers' : headers});
  }

  public updateInterest(id : any, typeId : any, value : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("typeId" , typeId.toString()).set("value" , value.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateInterest", {'headers' : headers});
  }

  getUserInterest(id: any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getUsersInterest", {'headers' : headers});
  }

  setUpInterest(userInterest: UserInterest, userId : number) {
    return this.httpClient.post(this.url + "setUpInterest", {
      "body" : {
        "university" : userInterest.university,
        "course" : userInterest.course,
        "gender" : userInterest.gender,
        "drinking" : userInterest.drinking,
        "smoking" : userInterest.smoking,
        "vegan" : userInterest.vegan,
        "max_age" : userInterest.max_age,
        "min_age" : userInterest.min_age,
        "userId" : userId
      }
    });
  }
}
