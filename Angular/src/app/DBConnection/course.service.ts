import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/course/';
  private url = 'http://localhost/CourseMates/CS4116-DatingApp/DBConnection/course/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public getById(id: any){
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getById", {'headers': headers});
  }

  public getByUniversityId(universityId: any){
    let headers = new HttpHeaders().set("universityId", universityId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByUniversityId", {'headers': headers});
  }

  public insertCourse(name : any , universityId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("name" , name.toString()).set("universityId" , universityId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "insertCourse", {'headers' : headers} )
  }

  public deleteCourse(id : any ) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "deleteCourse", {'headers' : headers} )
  }

}
