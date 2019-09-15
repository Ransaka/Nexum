import { UserService } from './../../../services/user.service';
import { BroadcastService } from './../../../services/broadcast.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../../../services/user.dto';

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

  broadcastArray = [];
  current_user: User;

  ngOnInit() {
    this.getUser();
  }

  // Get user details
  getUser() {
    return this._userservice
      .collectCurrent()
      .subscribe(res => (this.current_user = res));
  }

  // Get all broadcasts
  private getBroadcasts(id: String) {
    this._broadcastservice
      .getBroadcast(id)
      .subscribe(data => (this.broadcastArray = data));
    console.log(this.broadcastArray);
  }
}
