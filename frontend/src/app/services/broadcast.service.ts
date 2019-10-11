import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Broadcast } from './broadcast.dto';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  constructor(private http: HttpClient) {}

  //Sending broadcast message to the backend
  sendBroadcast(broadcast: Broadcast) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    console.log(broadcast);
    return this.http.put(
      'http://localhost:3000/user/broadcast/new',
      broadcast,
      { headers }
    );
  }

  // Get all broadcasts
  getBroadcast(): Observable<Broadcast[]> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('jwt_token')
    );
    return this.http.get<Broadcast[]>(
      'http://localhost:3000/user/broadcast/all',
      {
        headers
      }
    );
  }

  // Get a broadcast by id
  getBroadcastById(id: string): Observable<Broadcast> {
    console.log(id);
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<Broadcast>(
      'http://localhost:3000/user/broadcast/' + id,
      {
        headers
      }
    );
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
}
