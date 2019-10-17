import { Selling, Product } from './../../../services/selling.dto';
import { SellingService } from './../../../services/selling.service';
import { UserService } from 'app/services/user.service';
import { User } from './../../../services/user.dto';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms'; 
import { RatingformService } from 'app/services/ratingform.service';
import {ReplyformService } from 'app/services/reply.service';
import { Router } from '@angular/router';
declare const feather: any;
export interface Message {
  text: string;
  name: string;
}
@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrls: ['./sellerprofile.component.scss']
})
export class SellerprofileComponent implements OnInit {
  constructor(
    private _userservice: UserService,
    private _sellingservice: SellingService,
    private rateing: RatingformService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private replying:ReplyformService  , 
    private router: Router

  ) { this.highestRate = 0;
    this.totalRates = 0;
    this.starFivePer = 0;
    this.starFourPer = 0;
    this.starThreePer = 0;
    this.starTwoPer = 0;
    this.starOnePer = 0; 
     this.reviewlist=[];
     this.datelist=[];
    this.starOnePer = 0;
    this.buttonClicked ;
    this.idlist=[];
    this.numlist=[];
     this.timelist=[];
     this.replylist=[];}

  current_user: User;
  sellingArray: Selling[];
  recievedBroadcasts: any[] = [];

   

  // Get user details
  getUser() {
    return this._userservice
      .collectCurrent()
      .subscribe(res => (this.current_user = res));
  }

  highestRate: number;
  totalRates: number;
  starFivePer: number;
  starFourPer: number;
  starThreePer: number;
  starTwoPer: number;
  starOnePer: number;
  reviewlist:any=[];
  datelist:any=[];
  buttonClicked:number;
  idlist:any=[];
  replyForm: FormGroup; 
  numlist:any=[] ;
  replylist:any=[];
  timelist:any=[];

  @Output() onSendMessage: EventEmitter<Message> = new EventEmitter();
  message = {
    name: '',
    text: ''
  };
  sendMessage() {
    if (this.message.text !== '' && this.message.name !== '') {
      this.http
        .post(`http://localhost:4200/messages`, this.message)
        .subscribe((res: Message) => {
          this.onSendMessage.emit(res);
          this.message = {
            name: '',
            text: ''
          };
        });
    }
  }
  messages: Array<Message> = [];
  ngOnInit() {
    this.getRatings();
    this.getreply();
    this.getUser();
    this.getSelling();
    this.getRecentBroadcasts();
    var current_user = localStorage.getItem("user_id");

      this.replyForm =  this.formBuilder.group({
        _id: current_user, 
        nom:[''],
        reply:['']
      });

  }

  getRatings() {
    let currentUser = localStorage.getItem('current_user');
    this.rateing.getRatings(currentUser).subscribe(
      res => {
        console.log(res);
        this.calcRatings(res);
        this.viewReview(res);
      },
      err => {}
    );
  }
  getreply() {
    let currentUser = localStorage.getItem('current_user');
    this.replying.getreply(currentUser).subscribe(
      res => {
        console.log(res);
        this.viewReply(res);
      },
      err => {}
    );
  }

  // Get all selling
  getSelling() {
    this._sellingservice
      .getSelling()
      .subscribe(data => (this.sellingArray = data as Selling[]));
  }

  getRecentBroadcasts() {
    let promise = new Promise((resolve, reject) => {
      this._sellingservice
        .getItems()
        .toPromise()
        .then(res => {
          res.forEach(item => {
            console.log(item);
            const request = {
              element: item
            };
            this._sellingservice
              .getUsers(request as Product)
              .subscribe(data => this.recievedBroadcasts.push(data));
          });
        });
    });
    return promise;
  }

  // remove a selling
  removeSelling(id) {
    console.log(id);
    this._sellingservice
      .removeSelling(id as string)
      .subscribe(data => this.getSelling());
  }
}
    calcRatings(ratings) {
    if (ratings) {
      this.totalRates = ratings.length;
      let one = 0;
      let two = 0;
      let three = 0;
      let four = 0;
      let five = 0;
      let topCount = 0;

      for (let i = 0; i < ratings.length; i++) {
        
        if (ratings[i]) {
          switch (ratings[i].rate) {
            case 1:
              one++;
              this.starOnePer = (one / this.totalRates) * 100;
              if (topCount < one) {
                this.highestRate = 1;
                topCount = one;
              }

              break;
            case 2:
              two++;
              this.starTwoPer = (two / this.totalRates) * 100;
              if (topCount < two) {
                this.highestRate = 2;
                topCount = two;
              }
              break;
            case 3:
              three++;
              this.starThreePer = (three / this.totalRates) * 100;
              if (topCount < three) {
                this.highestRate = 3;
                topCount = three;
              }
              break;
            case 4:
              four++;
              this.starFourPer = (four / this.totalRates) * 100;
              if (topCount < four) {
                this.highestRate = 4;
                topCount = four;
              }
              break;
            case 5:
              five++;
              this.starFivePer = (five / this.totalRates) * 100;
              if (topCount < five) {
                this.highestRate = 5;
                topCount = five;
              }
              break;
          }
        }
      }
    }
  }

  viewReview(ratings){
    if (ratings) {
      let idea = null; 
      let day;
      let no;
      let k=0;
   for (let j= 0; j < ratings.length; j++) {
            idea=ratings[j].review;
            day=ratings[j].date;
            no=ratings[j]._id;
     if(k==3) {
       break;
     }
     else{      
      if(idea==null){
      }else{
       k++;
     this.reviewlist[k]= idea;
     this.datelist[k]=day;
     this.idlist[k]=no; 
    }}
       // this.review= ratings[j].review;
       // this.date[k]=ratings[j].date;
     }
  }

 }

 onLinkClicked(NIC){
  //  if(NIC==id){
   this.buttonClicked = NIC;
   
 }
//  submitreplyForm() {
//   console.log(this.replyForm.value);
// } 
sendreply() {
      
  var current_user = localStorage.getItem("current_user");
  const request = {
    _id: current_user,
    nom: this.buttonClicked,
    reply: this.replyForm.controls['reply'].value
  }
  this.replying.sendreply(request).subscribe(res => {
    this.router.navigateByUrl('/userprofile/customerprofile')
  }) 

}  
viewReply(replying){
   
  let k=0; 
  let my;
  let numb;  
 for (let j= 0; j < replying.length; j++) {
   
      k++;
   this.replylist[k]=replying[j].reply; 
   this.timelist[k]=replying[j].date;
   this.numlist[k]=replying[j].nom; 
  }}
     // this.review= ratings[j].review;
     // this.date[k]=ratings[j].date;
   }


  
 

   
