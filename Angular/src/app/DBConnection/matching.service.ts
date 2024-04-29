import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/matching/';
  private url = 'http://localhost/CS4116-DatingApp/DBConnection/matching/';

  constructor(private httpClient: HttpClient) { }

  public like(userId : any, recommendedUserId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId" , userId.toString()).set("recommendedUserId" , recommendedUserId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "like" , {'headers' : headers});
  }

  public dislike(userId : any, recommendedUserId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId" , userId.toString()).set("recommendedUserId" , recommendedUserId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "dislike" , {'headers' : headers});
  }

  public checkIfMatch(userId : any, recommendedUserId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId" , userId.toString()).set("recommendedUserId" , recommendedUserId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "checkIfMatch" , {'headers' : headers});
  }
}
