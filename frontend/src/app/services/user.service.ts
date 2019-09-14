import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';
import { User } from './user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Api endpoint
  private currentUrl = 'http://localhost:3000/user/current';

  constructor(private http: HttpClient) {}

  // Get current user
  getUser(id) {
    return this.http.get('http://localhost:3000/user/' + id).pipe(
      first(),
      map(res => res as User),
      tap(user => this.setUser(user))
    );
  }

  //Update current user
  updatetUser(user: User) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('current_user')
    );
    return this.http.put<any>('http://localhost:3000/user/edit', user, {
      headers
    });
  }

  removeCurrent() {
    this.removeUser();
  }

  // Get current user
  collectCurrent(): Observable<User> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('jwt_token')
    );
    return this.http
      .get('http://localhost:3000/user/current', { headers })
      .pipe(
        first(),
        map(res => res as User),
        tap(user => this.setUser(user))
      );
  }

  private setUser(response: User) {
    localStorage.setItem('current_user', JSON.stringify(response));
  } 
    localStorage.setItem('current_user', response._id);
  }

  private removeUser() {
    localStorage.removeItem('current_user');
  }
}
