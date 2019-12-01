import { Message } from './../../ratings/ratings.component';
import { Router } from '@angular/router';
import { ReplyformService } from './../../../services/reply.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RatingformService } from './../../../services/ratingform.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  highestRate: number;
  totalRates: number;
  starFivePer: number;
  starFourPer: number;
  starThreePer: number;
  starTwoPer: number;
  starOnePer: number;
  reviewlist: any = [];
  datelist: any = [];
  buttonClicked: number;
  idlist: any = [];
  replyForm: FormGroup;
  numlist: any = [];
  replylist: any = [];
  timelist: any = [];
  viewReply: any;

  constructor(
    private rateing: RatingformService,
    private http: HttpClient,
    private replying: ReplyformService,
    private router: Router
  ) {
    this.highestRate = 0;
    this.totalRates = 0;
    this.starFivePer = 0;
    this.starFourPer = 0;
    this.starThreePer = 0;
    this.starTwoPer = 0;
    this.starOnePer = 0;
    this.reviewlist = [];
    this.datelist = [];
    this.starOnePer = 0;
    this.buttonClicked;
    this.idlist = [];
    this.numlist = [];
    this.timelist = [];
    this.replylist = [];
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
    this.getRatings();
    this.getreply();
    var current_user = localStorage.getItem('user_id');
  }

  getRatings() {
    let currentUser = localStorage.getItem('user_id');
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
    let currentUser = localStorage.getItem('user_id');
    this.replying.getreply(currentUser).subscribe(
      res => {
        console.log(res);
        this.viewReply(res);
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

  viewReview(ratings) {
    if (ratings) {
      let idea = null;
      let day;
      let no;
      let k = 0;
      for (let j = 0; j < ratings.length; j++) {
        idea = ratings[j].review;
        day = ratings[j].date;
        no = ratings[j]._id;
        if (k == 3) {
          break;
        } else {
          if (idea == null) {
          } else {
            k++;
            this.reviewlist[k] = idea;
            this.datelist[k] = day;
            this.idlist[k] = no;
          }
        }
        // this.review= ratings[j].review;
        // this.date[k]=ratings[j].date;
      }
    }
  }

  onLinkClicked(NIC) {
    //  if(NIC==id){
    this.buttonClicked = NIC;
  }

  submitreplyForm() {
    console.log(this.replyForm.value);
  }
}
