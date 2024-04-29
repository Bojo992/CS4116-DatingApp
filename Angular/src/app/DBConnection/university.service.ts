import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/university/';
  private url = 'http://localhost/CourseMates/DBConnection/university/';

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

  public addUniversity(name: string) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "insertUniversity",
      {
        'headers': headers,
        'body': {'name': name}
      });
  }

  public deleteUniversity(id: any) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "deleteUniversity",
      {
        'headers': headers,
        'body': {'id': id}
      });
  }
}
