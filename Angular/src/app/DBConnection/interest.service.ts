import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/interest/';
  private url = 'http://localhost/CourseMates/CS4116-DatingApp/DBConnection/interest/';

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
}
