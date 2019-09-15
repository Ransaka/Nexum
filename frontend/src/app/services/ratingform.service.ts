
 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from './ratingform.dto'
@Injectable({
  providedIn: 'root'
})
export class RatingformService {

  constructor(private http: HttpClient) { }

  sendRating(request: Rating) {
    return this.http.put('http://localhost:3000/user/rate/create' ,request);
  }

  getRatings(userId) {
    return this.http.get<any>(`http://localhost:3000/user/rate/${userId}`);
  }
}
