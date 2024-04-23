import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // private url = 'http://coursemates.infinityfreeapp.com/DBConnection/messages/';
  private url = 'http://localhost/CS4116-DatingApp/DBConnection/messages/';

  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.url + "getAll");
  }

  public getAllByChatId(chatId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("chatId" , chatId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "getAllByChatId" , {'headers' : headers});
  }

  public insertMessage(chatId : any, message : any, senderId : any, receiverId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("chatId" , chatId.toString()).set("message" , message.toString()).set("senderId" , senderId.toString()).set("receiverId" , receiverId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "insertMessage" , {'headers' : headers});
  }

  public deleteMessage(messageId : any) {
    let headers : HttpHeaders = new HttpHeaders().set("messageId" , messageId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "deleteMessage" , {'headers' : headers});
  }

}
