import { Selling } from './../../../services/selling.dto';
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

  ngOnInit() {
    this.getUser();
    this.getSelling();
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

  a = new Array();
  // Get all selling
  async getBroadcasts() {
    this._sellingservice.getBroadcasts().subscribe(data => this.a.push(data));
  }

  sellingItems: String[];
  // Get all selling
  async test() {
    await this._sellingservice
      .getItems()
      .subscribe(data => (this.sellingItems = data));
  }

  async test1(item: String) {
    await this._sellingservice
      .getUsers(item)
      .subscribe(data => console.log(data));
  }

  async getAllBroad() {
    await this.test().then(() => {
      console.log(this.sellingItems);
      // this.sellingItems.forEach(element => {
      //   this.test1(element);
      //   console.log(element);
      // });
    });
  }
}
