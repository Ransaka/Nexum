import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  //Sending broadcast message to the backend
  sendForm(form: any) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    return this.http.put('http://localhost:3000/user/history/new', form, {
      headers
    });
  }

  // Get all broadcasts
  getpurchaseHistory(): Observable<any[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<any[]>(
      'http://localhost:3000/user/history/getPurchaseHistory',
      {
        headers
      }
    );
  }
}
