import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';
import { User } from './user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Api endpoint
  private currentUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  collectCurrent(): Observable<User> {
    return this.http.get(this.currentUrl).pipe(
      first(),
      map(res => res as User),
      tap(user => this.setUser(user))
    );
  }

  private setUser(response: User) {
    localStorage.setItem('current_user', JSON.stringify(response));
  }

  private removeUser() {
    localStorage.removeItem('current_user');
  }
}
