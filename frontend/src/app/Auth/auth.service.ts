import { User } from './../services/user.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, shareReplay, flatMap, map } from 'rxjs/operators';
import { SignInResponse, SignInRequest, SignUpRequest } from './auth.dto';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  ApiResponse: String;

  // Signup new user auth
  signUp(request: SignUpRequest) {
    return this.http
      .post('http://localhost:3000/user/signup', request)
      .pipe(map(res => this.ApiResponse));
  }

  // Login user auth
  login(request: SignInRequest) {
    return this.http
      .post('http://localhost:3000/user/login', request)
      .pipe(tap(res => this.setSession(res as SignInResponse)));
  }

  isAuthorized() {
    return moment().isBefore(this.getExpiration());
  }

  private setSession(response: SignInResponse) {
    console.log(response.accessToken);
    const expiresAt = moment().add(response.expiresIn, 'second');

    localStorage.setItem('jwt_token', response.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
