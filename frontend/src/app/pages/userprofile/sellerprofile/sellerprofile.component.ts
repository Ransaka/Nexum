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
    this.getAllBroad();
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
    await this._sellingservice
      .getBroadcasts()
      .subscribe(data => this.a.push(data));
  }

  private async getAllBroad() {
    const d = await this.getBroadcasts().then(() => {
      console.log(this.a.length);
      for (let i = 0; i < this.a.length; i++) {
        console.log('val ' + i);
      }
    });
  }
}
