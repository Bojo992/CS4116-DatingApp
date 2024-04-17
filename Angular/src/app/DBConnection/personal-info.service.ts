import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/personalInfo/';
  private url = 'http://localhost/CS4116-DatingApp/DBConnection/personalInfo/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public getById(id: any){
    let headers = new HttpHeaders().set("id", id.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getById", {'headers': headers});
  }

  public updateBio(id : any, bio : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("bio" , bio.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateBio" ,{'headers' : headers});
  }

  public updateSmoking(id : any, smoking : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("smoking" , smoking.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateSmoking" ,{'headers' : headers});
  }

  public updateAge(id : any, age : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("age" , age.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateAge" ,{'headers' : headers});
  }

  public updateVegan(id : any, vegan : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("vegan" , vegan.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateVegan" ,{'headers' : headers});
  }

  public updateLocation(id : any, location : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("location" , location.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateLocation" ,{'headers' : headers});
  }

  public updateGender(id : any, gender : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("gender" , gender.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateGender" ,{'headers' : headers});
  }

  public updateDrinking(id : any, drinking : any) {
    let headers : HttpHeaders = new HttpHeaders().set("id" , id.toString()).set("drinking" , drinking.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "updateDrinking" ,{'headers' : headers});
  }

  public insert(
    bio: any,
    smoking: any,
    age: any,
    vegan: any,
    location: any,
    Gender: any,
    drinking: any
  ) {
    let headers : HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post(this.url + "updateVegan" ,
      {
        'headers' : headers,
        'body' : {
          "bio" : bio.toString(),
          "smoking" : smoking.toString(),
          "age" : age.toString(),
          "vegan" : vegan.toString(),
          "location" : location.toString(),
          "gender" : Gender.toString(),
          "drinking": drinking.toString()
        }
      });
  }
}
