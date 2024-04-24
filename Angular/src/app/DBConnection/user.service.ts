import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/user/';
  private url = 'http://localhost/CourseMates/DBConnection/user/';

  constructor(private httpClient: HttpClient, ) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public getById(id: any){
    let headers = new HttpHeaders()
      .set("id", id.toString())
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getById", {'headers': headers});
  }

  public insertUser(isAdmin: number, userName: any, userEmail: any){
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "insertUser",
      {
        'headers': headers,
        'body': {
          'isAdmin': isAdmin,
          'username': userName.toString(),
          'userEmail': userEmail.toString()
        }
      });
  }

  updateCourse(userId: number, courseId: number) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "updateCourse",
      {
        'headers': headers,
        'body': {
          'id': userId,
          'courseId': courseId
        }
      });
  }

  updatePersonalInfo(userId: any, personalInterestId : any) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "updatePersonalInfo",
      {
        'headers': headers,
        'body': {
          'id': userId.toString(),
          'personalInterestId': personalInterestId.toString(),
        }
      });
  }

  updateProfilePicture(userId: number, file : File) {
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      let resultString = fileReader.result as string;

      let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*');
      return this.httpClient.post(this.url + "updatePersonalInfo",
        {
          'headers': headers,
          'body': {
            'id': userId,
            'profilePicture': resultString,
          }
        });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  changeAdminStatus(userId: number) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "changeAdminStatus",
      {
        'headers': headers,
        'body': {
          'id': userId
        }
      });
  }

  public deleteUser(id: number) {
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "deleteUser",
      {
        'headers': headers,
        'body': {
          'id': id
        }
      });
  }
}
