import { Username } from './../../../services/user.dto';
import { Finalizing } from './../../../services/selling.dto';
import { UserService } from './../../../services/user.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalizingformview',
  templateUrl: './finalizingformview.component.html',
  styleUrls: ['./finalizingformview.component.scss']
})
export class FinalizingformviewComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _broadcastService: BroadcastService,
    private _userService: UserService
  ) {}

  itemId: string;
  itemDetails: any;
  finalizingForms: Finalizing[];

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.itemId = params['id'];
      } else {
        this.itemId = '';
      }
    });
    this.getBroadcast();
    this.getFinalizingForms();
  }

  getBroadcast() {
    this._broadcastService
      .getBroadcastById(this.itemId)
      .subscribe(data => (this.itemDetails = data));
  }

  // Get finalized forms
  getFinalizingForms() {
    this._broadcastService
      .getFinalizingForms()
      .subscribe(data => (this.finalizingForms = data));
  }
}
