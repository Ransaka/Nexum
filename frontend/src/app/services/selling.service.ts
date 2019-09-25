import { Selling } from './selling.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellingService {
  constructor(private http: HttpClient) {}

  //Sending selling message to the backend
  sendSelling(selling: Selling) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    console.log(selling);
    return this.http.put('http://localhost:3000/user/selling/new', selling, {
      headers
    });
  }

  getSelling(): Observable<Selling[]> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('jwt_token')
    );
    return this.http.get<Selling[]>('http://localhost:3000/user/selling/all', {
      headers
    });
  }
}
