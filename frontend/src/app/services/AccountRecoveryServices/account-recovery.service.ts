import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountRecoveryService {
  constructor(private http: HttpClient) {}

  private currentUrl = 'http://localhost:3000/';

  //Sending reset user details
  sendResetUser(request: any) {
    return this.http.put(this.currentUrl + 'user/changePassword', request);
  }
}
