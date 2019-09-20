import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Replying } from './reply.dto'
@Injectable({
  providedIn: 'root'
})
export class ReplyformService {

  constructor(private http: HttpClient) { }

  sendreply(request: Replying) {
    return this.http.put('http://localhost:3000/user/reply/create' ,request);
  }
  getreply(userId) {
    return this.http.get<any>(`http://localhost:3000/user/reply${userId}`);
  }
  
}