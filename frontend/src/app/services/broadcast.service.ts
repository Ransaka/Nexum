import { HttpClient } from 'selenium-webdriver/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  constructor(private http: HttpClient) {}
}
