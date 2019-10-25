import { BroadcastService } from './../../services/broadcast.service';
import { Component, OnInit } from '@angular/core';
import { Broadcast } from './../../services/broadcast.dto';

@Component({
  selector: 'app-purchasehistory',
  templateUrl: './purchasehistory.component.html',
  styleUrls: ['./purchasehistory.component.scss']
})
export class PurchasehistoryComponent implements OnInit {
  constructor(private _broadcastservice: BroadcastService) {}

  ngOnInit() {
    this.getBroadcasts();
  }
  broadcastArray: Broadcast[];

  // Get all broadcasts
  getBroadcasts() {
    this._broadcastservice
      .getBroadcast()
      .subscribe(data => (this.broadcastArray = data as Broadcast[]));
  }
}
