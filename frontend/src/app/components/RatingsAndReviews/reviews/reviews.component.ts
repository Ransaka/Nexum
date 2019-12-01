import { ReplyformService } from './../../../services/reply.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
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
    private formBuilder: FormBuilder,
    private replying: ReplyformService
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

  ngOnInit() {
    this.replyForm = this.formBuilder.group({
      _id: current_user,
      nom: [''],
      reply: ['']
    });

    this.getreply();
    var current_user = localStorage.getItem('user_id');
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
}
