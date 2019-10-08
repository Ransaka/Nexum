import { Recovery } from './recovery.dto';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {
  constructor(private http: HttpClient) {}

  //Sending a new recovery email
  sendMail(request: Recovery) {
    return this.http.post(
      'http://localhost:3000/forgotPasswordMail/sendEmail',
      request
    );
  }

  //Check the availability of the email
  checkUser(request: Recovery) {
    return this.http.post(
      'http://localhost:3000/forgotPasswordMail/isavailable',
      request
    );
  }
}
