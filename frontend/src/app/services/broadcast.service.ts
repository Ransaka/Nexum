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

  getBroadcast(): Observable<Broadcast[]> {
    return this.http.get<Broadcast[]>(
      'http://localhost:3000/user/broadcast/all'
    );
  }
}
