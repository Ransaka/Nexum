import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatingformService } from 'app/services/ratingform.service';
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
  highestRate: number;
  totalRates: number;
  starFivePer: number;
  starFourPer: number;
  starThreePer: number;
  starTwoPer: number;
  starOnePer: number;
  review: string;
  date: Date;
  textAreasList: any = [];
  reviewlist:any=[];
  datelist:any=[];

  addTextarea() {
    this.textAreasList.push('text_area' + (this.textAreasList.length + 1));
  }

  constructor(private http: HttpClient, private rateing: RatingformService) {
    this.highestRate = 0;
    this.totalRates = 0;
    this.starFivePer = 0;
    this.starFourPer = 0;
    this.starThreePer = 0;
    this.starTwoPer = 0;
    this.starOnePer = 0; 
     this.review=null;
     this.reviewlist=[];
     this.datelist=[];
    this.starOnePer = 0;
    this.review = null;
    this.date;

  }
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
    feather.replace();
    this.getRatings();
  }

  getRatings() {
    let currentUser = JSON.parse(localStorage.getItem('current_user'));
    this.rateing.getRatings(currentUser._id).subscribe(
      res => {
        console.log(res);
        this.calcRatings(res);
        this.viewReview(res);
      },
      err => {}
    );
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
       let date;
       let k=0;
    for (let j= 1; j <= ratings.length; j++) {
             idea=ratings[j].review;
      
       if(idea==null){
       }else{
        k++;
      this.reviewlist[k]= idea;
       date=ratings[j].date;
       this.datelist[k]=date;
     }
       // this.review= ratings[j].review;
       // this.date[k]=ratings[j].date;
     }
  }
 }
}
  // viewReview(ratings) {
  //   for (let j = 0; j < ratings.length; j++) {
  //     this.review = ratings[j].review;
  //     this.date = ratings[j].date;
  //   }
  // }

