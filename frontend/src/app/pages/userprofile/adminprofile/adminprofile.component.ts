import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendwarningService } from 'app/services/sendwarning.service'
import { AuthService } from '../../../Auth/auth.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { error } from 'util';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit {
  public isCollapsed = false;
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ffffff' }, { lightness: 17 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 18 }]
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }, { lightness: 16 }]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }, { lightness: 21 }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#dedede' }, { lightness: 21 }]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }]
    },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#f2f2f2' }, { lightness: 19 }]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [{ color: '#fefefe' }, { lightness: 20 }]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }]
    }
  ];
  data: Date = new Date();
  focus;
  complains: Object | any[];
  first10: Object | any[];
  //id: number
  focus1;
  id: any;

  constructor(private auth: AuthService,private _sendWarning: SendwarningService,private router: Router) {}

  displayComplain(){
    this.auth.displayComplain().subscribe(
      auth=>{
        this.first10 = auth[5]
        this.complains = auth;
        console.log(this.complains)
      },
      error => console.log(error)
    );
  }
  sendEmail(adress) {
    this._sendWarning
      .sendMail({
        email:adress
      })
      .subscribe(
        res => {
          this.router.navigateByUrl('/');
        },
        err => {
          console.log(err);
          if (err.error.message) {
            error =>err.error.message;
          }
        }
      );
  }
  updateCompalin(id){
    this.auth.updateComplain({
      ref:id
    }).subscribe(
      res=>{
        //this.router.navigateByUrl('/');
        //this.router.navigate(['./userprofile/customerprofile'])
        this.router.navigate(['./userprofile/admin'])
      },
      err=>{
        console.log(err);
        if(err.error.message){
          error=>err.error.message;
        }
      }
    );
    //this.router.navigate(['./userprofile/admin'])
  }

  deleteComplain(id){
    console.log(id)
  }
  


  ngOnInit() {
    this.auth.displayComplain().subscribe(
      auth=>{
        this.complains = auth;
        console.log(this.complains)
      },
      error => console.log(error)
    );
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

  }



  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
