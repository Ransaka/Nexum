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

  id: String = '5d4a8b5d7e6ecf5efcb9a65a';
  broadcastArray = [];
  current_user: User;

  ngOnInit() {
    this.getBroadcasts(this.id);
    this.getUser(this.id);
    console.log(this.current_user);
  }

  // Get user details
  getUser(id: String) {
    return this._userservice
      .getUser(id)
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
