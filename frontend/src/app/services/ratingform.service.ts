import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from './ratingform.dto'
@Injectable({
  providedIn: 'root'
})
export class RatingformService {

  constructor(private http: HttpClient) { }

  sendRating(data: Rating) {
    console.log(data);
    return this.http.post('http://localhost:3000/user/rate/create' ,data);
  }
}

