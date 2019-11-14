import { Injectable } from '@angular/core';
import { sendWarning } from './sendwarning.dto';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendwarningService {

  constructor(private http: HttpClient) { }
  sendMail(body: sendWarning) {
    return this.http.post(
      'http://localhost:3000/user/mail/sendEmail',
      body
    );
  }
}
//



