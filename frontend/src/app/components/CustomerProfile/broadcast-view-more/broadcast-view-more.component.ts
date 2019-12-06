import { BroadcastService } from './../../../services/broadcast.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-broadcast-view-more',
  templateUrl: './broadcast-view-more.component.html',
  styleUrls: ['./broadcast-view-more.component.scss']
})
export class BroadcastViewMoreComponent implements OnInit {
  constructor(private _broadcastservice: BroadcastService) {}

  ngOnInit() {
    this.getBroadcasts();
  }

  broadcastArray = []; // Broadcasts of the user

  // Get all broadcasts
  getBroadcasts() {
    this._broadcastservice
      .getBroadcast()
      .subscribe(data => (this.broadcastArray = data));
  }
}
