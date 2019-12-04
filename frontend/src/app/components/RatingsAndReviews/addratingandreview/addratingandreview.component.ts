import { RatingformService } from './../../../services/ratingform.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addratingandreview',
  templateUrl: './addratingandreview.component.html',
  styleUrls: ['./addratingandreview.component.scss']
})
export class AddratingandreviewComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  ratingForm: FormGroup;

  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private rating: RatingformService,
    private router: Router
  ) {}

  sellerId: String;
  user: any;
  current_user: String;

  ngOnInit() {
    this.current_user = localStorage.getItem('user_id');

    this._activatedRoute.params.subscribe(params => {
      if (typeof params['seller_id'] !== 'undefined') {
        this.sellerId = params['seller_id'];
        this.getUserDetails();
      } else {
        this.sellerId = '';
      }
    });

    this.ratingForm = this._formBuilder.group({
      rate: ['', Validators.required],
      review: ['']
    });
  }

  getUserDetails() {
    this._userService
      .gettUserById({ _id: this.sellerId })
      .subscribe(data => (this.user = data));
  }

  countStar(star: number) {
    this.selectedValue = star;
  }

  sendRatingAndReview() {
    const request = {
      _id: this.sellerId,
      rate: this.selectedValue,
      review: this.ratingForm.controls['review'].value,
      raterId: this.current_user
    };
    this.rating.sendRating(request).subscribe(res => {
      this.router.navigateByUrl('/userprofile/customerprofile');
    });
  }
}
