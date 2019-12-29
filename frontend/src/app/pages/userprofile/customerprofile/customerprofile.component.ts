import { HistoryService } from './../../../services/history.service';
import { UserService } from './../../../services/user.service';
import { BroadcastService } from './../../../services/broadcast.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../../../services/user.dto';
import { Broadcast } from './../../../services/broadcast.dto';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.scss']
})
export class CustomerprofileComponent implements OnInit {
  constructor(
    private _broadcastservice: BroadcastService,
    private _userservice: UserService,
    private _historyservice: HistoryService
  ) {}

  broadcastArray = []; // Broadcasts of the user
  current_user: User; //User details of the current user
  searchUsername: string;
  purchaseHistory: any[];

  ngOnInit() {
    this.getUser();
    this.getBroadcasts();
    this.getPurchaseHistory();
  }

  // Get user details
  getUser() {
    return this._userservice
      .collectCurrent()
      .subscribe(res => (this.current_user = res));
  }

  // Get all broadcasts
  getBroadcasts() {
    this._broadcastservice
      .getBroadcast()
      .subscribe(data => (this.broadcastArray = data));
  }

  removeBroadcast(id) {
    this._broadcastservice
      .removeBroadcast(id as string)
      .subscribe(data => this.getBroadcasts());
  }

  getPurchaseHistory() {
    this._historyservice
      .getpurchaseHistory()
      .subscribe(data => ((this.purchaseHistory = data), console.log(data)));
  }
}
