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
    console.log(broadcast);
    return this.http.post('http://localhost:3000/user/broadcast', broadcast);
  }

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
