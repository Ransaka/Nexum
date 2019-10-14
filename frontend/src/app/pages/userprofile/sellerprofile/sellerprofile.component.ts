import { Selling, Product } from './../../../services/selling.dto';
import { SellingService } from './../../../services/selling.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from './../../../services/user.dto';

@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrls: ['./sellerprofile.component.scss']
})
export class SellerprofileComponent implements OnInit {
  constructor(
    private _userservice: UserService,
    private _sellingservice: SellingService
  ) {}

  current_user: User;
  sellingArray: Selling[];
  recievedBroadcasts: any[] = [];

  ngOnInit() {
    this.getUser();
    this.getSelling();
    this.getRecentBroadcasts();
  }

  // Get user details
  getUser() {
    return this._userservice
      .collectCurrent()
      .subscribe(res => (this.current_user = res));
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
