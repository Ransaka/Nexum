import { Bookmark } from './bookmark.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  constructor(private http: HttpClient) {}

  //Sending a new bookmark
  addBookmark(request: Bookmark) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    return this.http.put('http://localhost:3000/user/bookmark/new', request, {
      headers
    });
  }

  //Find if bookmarked
  isBookmaked(userID: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    return this.http.post(
      'http://localhost:3000/user/bookmark/findIfBookmarked',
      userID,
      {
        headers
      }
    );
  }

  // Get all bookmarks
  getBookmarks(): Observable<Bookmark[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<Bookmark[]>(
      'http://localhost:3000/user/bookmark/getBookmarks',
      {
        headers
      }
    );
  }

  //Find if bookmarked
  removeBookmark(userID: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    return this.http.post(
      'http://localhost:3000/user/bookmark/delete/' + userID,
      userID,
      {
        headers
      }
    );
  }
}
