import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Broadcast } from './broadcast.dto';

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

  getBroadcast(id): Observable<Broadcast[]> {
    return this.http.get<Broadcast[]>(
      'http://localhost:3000/user/broadcast/' + id
    );
  }
}
