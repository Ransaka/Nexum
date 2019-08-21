import { BroadcastService } from './../../../services/broadcast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.scss']
})
export class CustomerprofileComponent implements OnInit {
  constructor(private _broadcastservice: BroadcastService) {}

  id: String = '5d4a8b5d7e6ecf5efcb9a65a';
  broadcastArray = [];
  ngOnInit() {
    this.getBroadcasts(this.id);
  }

  private getBroadcasts(id: String) {
    this._broadcastservice
      .getBroadcast(id)
      .subscribe(data => (this.broadcastArray = data));
    console.log(this.broadcastArray);
  }
}
