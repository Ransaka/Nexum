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
    private _userservice: UserService
  ) {}

  broadcastArray: Broadcast[];
  current_user: User;

  ngOnInit() {
    this.getUser();
    this.getBroadcasts();
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
      .subscribe(data => (this.broadcastArray = data as Broadcast[]));
  }
}
