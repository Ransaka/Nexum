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
      .post<any>('http://localhost:3000/user/login', request)
      .pipe(
        tap(res => this.setSession(res as SignInResponse)),
        shareReplay(),
        flatMap(() => this.userService.collectCurrent())
      );
  }

  // Set session
  private setSession(response: SignInResponse) {
    const expiresAt = moment().add(response.expiresIn, 'second');
    localStorage.setItem('user_id', response.user_id);
    localStorage.setItem('jwt_token', response.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  //Check for the token availability in local storage
  isLogged() {
    return !!localStorage.getItem('token');
  }

  isAuthorized() {
    return moment().isBefore(this.getExpiration());
  }

  signOut() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userService.removeCurrent();
  }

  //make new complain
  // makeComplain(complain: NewComplain) {
  //   console.log('at service file 1' + JSON.stringify(complain));

  //   return this.http
  //     .post('http://localhost:3000/user/rate/create', complain)
  //     .pipe(map(res => this.ApiResponse));
  // }
  // eof make new complain
}
