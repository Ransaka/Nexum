import { UserService } from 'app/services/user.service';
import { RatingformService } from 'app/services/ratingform.service';
import { ReplyformService } from './../../../services/reply.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  ratingsArray: any;
  raterDetails: any;
  textbox: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private replying: ReplyformService,
    private _ratings: RatingformService,
    private _user: UserService
  ) {}

  ngOnInit() {
    this.textbox = false;
    this.getRatings();
  }

  // Get ratings
  getRatings() {
    let promise = new Promise((resolve, reject) => {
      this._ratings
        .getAllRatings()
        .toPromise()
        .then(res => {
          this.ratingsArray = res;
          console.log(res[0].raterId);
          this._user
            .gettUserById({ _id: res[0].raterId })
            .subscribe(data => (this.raterDetails = data));
        });
    });
    return promise;
  }

  textboxPop() {
    this.textbox = true;
  }
}
