import { Finalizing } from './selling.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Broadcast } from './broadcast.dto';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private currentUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  //Sending broadcast message to the backend
  sendBroadcast(broadcast: Broadcast) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    return this.http.put(this.currentUrl + 'user/broadcast/new', broadcast, {
      headers
    });
  }

  // Get all broadcasts
  getBroadcast(): Observable<Broadcast[]> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('jwt_token')
    );
    return this.http.get<Broadcast[]>(this.currentUrl + 'user/broadcast/all', {
      headers
    });
  }

  // Get a broadcast by id
  getBroadcastById(id: string): Observable<Broadcast> {
    console.log(id);
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<Broadcast>(this.currentUrl + 'user/broadcast/' + id, {
      headers
    });
  }

  getSellingItems(): Observable<String[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<String[]>(
      'http://localhost:3000/user/getRecentBroadcast/test',
      {
        headers
      }
    );
  }

  // Get all forms by name
  getFinalizingForms(): Observable<Finalizing[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<Finalizing[]>(
      'http://localhost:3000/user/getFinalizingForms/all',
      {
        headers
      }
    );
  }

  // Get a form by id
  getFormById(id: string): Observable<Broadcast> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<Broadcast>(
      'http://localhost:3000/user/getFinalizingForms/' + id,
      {
        headers
      }
    );
  }

  // Payment
  payment(request: String): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/user/paypal/pay',
      request
    );
  }

  // Remove a broadcast
  removeBroadcast(broadcast_id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.delete<any>(
      this.currentUrl + 'user/broadcast/remove/' + broadcast_id,
      {
        headers
      }
    );
  }
}
