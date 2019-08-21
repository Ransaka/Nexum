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
    private _userService: UserService
  ) {}

  id: String = '5d4a8b5d7e6ecf5efcb9a65a';
  broadcastArray = [];
  user: User;
  ngOnInit() {
    this.getBroadcasts(this.id);
    this.getUser(this.id);
  }

  //Get user details
  private getUser(id: String) {
    this._userService.getUser(id).subscribe(data => (this.user = data));
    console.log(this.user);
  }

  // Get all broadcasts
  private getBroadcasts(id: String) {
    this._broadcastservice
      .getBroadcast(id)
      .subscribe(data => (this.broadcastArray = data));
    console.log(this.broadcastArray);
  }
}
