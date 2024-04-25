import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BanService {
// private url = 'http://coursemates.infinityfreeapp.com/DBConnection/ban/';
  private url = 'http://localhost/CS4116-DatingApp/DBConnection/ban/';

  constructor(private httpClient: HttpClient) {
  }

  public banUser(userId: any, description: any, banTime: any) {
    let headers: HttpHeaders = new HttpHeaders().set("userId", userId.toString()).set("description", description.toString()).set("banTime", banTime.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "banUser", {'headers': headers});
  }

  public unbanUser(userId: any) {
    let headers: HttpHeaders = new HttpHeaders().set("userId", userId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "unbanUser", {'headers': headers});
  }

  public checkIfBanned(userId: any) {
    let headers: HttpHeaders = new HttpHeaders().set("userId", userId.toString()).set('Access-Control-Allow-Origin', '*');
    return this.httpClient.get(this.url + "checkIfBanned", {'headers': headers});
  }
}