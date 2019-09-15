import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Broadcast } from './broadcast.dto';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  constructor(private http: HttpClient) {}

  //Sending broadcast message to the backend
  sendBroadcast(broadcast: Broadcast) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('current_user')
    );
    console.log(broadcast);
    return this.http.put(
      'http://localhost:3000/user/broadcast/new',
      broadcast,
      { headers }
    );
  }

  getBroadcastk(id): Observable<Broadcast[]> {
    return this.http.get<Broadcast[]>('http://localhost:3000/user/broadcast/' + id);
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
}
