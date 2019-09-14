import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Backend url for signin
  private _signinUrlCust = "http://localhost:3000/api/custsignin"
  private _signinUrlSeller = "http://localhost:3000/api/sellersignin"

  private _loginUrl = "http://localhost:3000/api/login"
   

  constructor(private http: HttpClient) { }

  // Http request method
  /*
  Returns what the backend sends 
  */
   signinCust(user){
    return this.http.post<any>(this._signinUrlCust, user)
  }

  signinSeller(seller){
    return this.http.post<any>(this._signinUrlSeller, seller)
  }

  login(log){
    return this.http.post<any>(this._loginUrl, log)
  }
   

}
