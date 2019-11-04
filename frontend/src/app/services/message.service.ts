import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn : 'root'
})

export class MessageService {

    constructor (private http: HttpClient){}

    getcurrentUser (){
        this.http.get('http://localhost:4200/userprofile/search/:id')
    }
    
}