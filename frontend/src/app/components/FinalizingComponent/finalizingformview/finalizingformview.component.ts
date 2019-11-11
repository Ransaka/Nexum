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
    this.test();
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

  // Get seller by id
  getSeller() {
    this.finalizingForms.forEach(product => {
      console.log(product);
    });

    // this._userService
    //   .gettUserById(_id)
    //   .subscribe(data => ());
  }

  // Get details of the related broadcasts
  test() {
    let promise = new Promise((resolve, reject) => {
      this._broadcastService
        .getFinalizingForms()
        .toPromise()
        .then(data => {
          this.finalizingForms = data;
          console.log(data);
          console.log(data.length);
          // data.forEach(obj => {
          //   console.log(obj);
          //   this._userService
          //     .gettUserById(obj.sellerId)
          //     .subscribe(data => console.log(data));
          // });
        });
    });
    return promise;
  }
}
