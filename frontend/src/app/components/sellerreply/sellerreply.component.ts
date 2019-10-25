import { BroadcastService } from './../../services/broadcast.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Broadcast } from './../../services/broadcast.dto';

@Component({
  selector: 'app-sellerreply',
  templateUrl: './sellerreply.component.html',
  styleUrls: ['./sellerreply.component.scss']
})
export class SellerreplyComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _broadcastService: BroadcastService
  ) {}

  id: string;
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
      } else {
        this.id = '';
      }
    });
    console.log('seller :' + this.id);
    this.getBroadcasts();
  }

  broadcastData: any;

  // Get all broadcasts
  getBroadcasts() {
    this._broadcastService
      .getBroadcastById(this.id)
      .subscribe(data => (this.broadcastData = data));
  }
}
