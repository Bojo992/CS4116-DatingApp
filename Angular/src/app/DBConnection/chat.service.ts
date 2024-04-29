import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
// private url = 'http://coursemates.infinityfreeapp.com/DBConnection/chat/';
  private url = 'http://localhost/CourseMates/DBConnection/chat/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public insertChat(chatId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("chatId" , chatId.toString()).set('Access-Control-Allow-Origin', '*');;
    return this.httpClient.get(this.url + "insertChat" , {'headers' : headers} )
  }

  public deleteChat(chatId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("chatId" , chatId.toString()).set('Access-Control-Allow-Origin', '*');;
    return this.httpClient.get(this.url + "deleteChat" , {'headers' : headers});
  }

  public getByUserId(userId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("userId" , userId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getByUserId" , {'headers' : headers});
  }
}
