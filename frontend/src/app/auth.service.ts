import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Backend url for signin
  private _signinUrl = "http://localhost:3000/api/signin"
  constructor(private http: HttpClient) { }

  // Http request method
  /*
  Returns what the backend sends 
  */
  signinUser(user){
    return this.http.post<any>(this._signinUrl, user)
  }
}
