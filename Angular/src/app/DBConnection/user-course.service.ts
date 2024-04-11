import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserCourseService {
  private url = 'http://coursemates.infinityfreeapp.com/DBConnection/UserCourse/';
  // private url = 'http://localhost/CourseMates/DBConnection/userCourse/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public getById(id: any){
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getById", {'headers': headers});
  }

  public getByCourseId(courseId: any){
    let headers = new HttpHeaders().set("courseId", courseId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByCourseId", {'headers': headers});
  }

  public getByUniversityId(universityId: any){
    let headers = new HttpHeaders().set("universityId", universityId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByUniversityId", {'headers': headers});
  }

  public insertUserCourse(universityId: any , courseId : any){
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set("universityId" , universityId.toString()).set("courseId" , courseId.toString());
    return this.httpClient.get(this.url + "insertUserCourse", {'headers': headers});
  }

  public deleteUserCourse(id: any){
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set("id" , id.toString());
    return this.httpClient.get(this.url + "deleteUserCourse", {'headers': headers});
  }

}
