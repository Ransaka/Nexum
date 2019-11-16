import { Selling, Product, Finalizing } from './selling.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellingService {
  private currentUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  //Set new selling item
  sendSelling(selling: Selling) {
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    return this.http.put(this.currentUrl + 'user/selling/new', selling, {
      headers
    });
  }

  getSelling(): Observable<Selling[]> {
    const headers = new HttpHeaders().set(
      'x-access-token',
      localStorage.getItem('jwt_token')
    );
    return this.http.get<Selling[]>('http://localhost:3000/user/selling/all', {
      headers
    });
  }

  getBroadcasts() {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<any>(
      'http://localhost:3000/user/getRecentBroadcasts/test',
      {
        headers
      }
    );
  }

  //Get each selling item
  getItems(): Observable<String[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<String[]>(
      this.currentUrl + 'user/getRecentBroadcast/getsellingitem',
      {
        headers
      }
    );
  }

  //Get users who has broadcasts the product
  getUsers(item: Product): Observable<String[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.post<String[]>(
      this.currentUrl + 'user/getRecentBroadcast/userdata',
      item,
      {
        headers
      }
    );
  }

  // Get selling item details
  getItem(request: String): Observable<String> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.get<String>(
      'http://localhost:3000/user/selling/' + request,
      {
        headers
      }
    );
  }

  //Sending new finalizing form to the backend
  sendFinalizing(finalizing: Finalizing) {
    console.log(finalizing);
    const headers = new HttpHeaders().set(
      'uid',
      localStorage.getItem('user_id')
    );
    return this.http.put(
      this.currentUrl + 'user/selling/newfinalizing',
      finalizing,
      {
        headers
      }
    );
  }

  removeSelling(selling_id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-access-token', localStorage.getItem('jwt_token'))
      .set('uid', localStorage.getItem('user_id'));
    return this.http.delete<any>(
      'http://localhost:3000/user/selling/remove/' + selling_id,
      {
        headers
      }
    );
  }
}
