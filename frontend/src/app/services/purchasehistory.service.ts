import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class purchasehistoryService {

  constructor(private http: HttpClient) { }

   
  getpurchasehistory(userId) {
    return this.http.get<any>(`http://localhost:3000/user/selling/newfinalizing/${userId}`);
  }
}
