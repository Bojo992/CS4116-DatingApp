import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
// private url = 'http://coursemates.infinityfreeapp.com/DBConnection/profile/';
  private url = 'http://localhost/CourseMates/DBConnection/report/';

  constructor(private httpClient: HttpClient) { }

  public reportUser(id: number, description: string) {
    let headers : HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "reportUser" , {'headers' : headers, 'body': {id: id, description: description}});
  }

  public getAllReports () {
    let headers : HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getAllReports" , {'headers' : headers});
  }
}
