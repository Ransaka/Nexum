import { Product } from '../../../services/selling.dto';
import { SellingService } from '../../../services/selling.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellingitem',
  templateUrl: './sellingitem.component.html',
  styleUrls: ['./sellingitem.component.scss']
})
export class SellingitemComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _sellingService: SellingService
  ) {}

  itemId: String;
  itemDetails: any;
  recievedBroadcasts: any[] = [];

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.itemId = params['id'];
      } else {
        this.itemId = '';
      }
    });
    this.getRecentBroadcasts();
  }

  // // Get item details
  // getItem() {
  //   return this._sellingService
  //     .getItem(this.itemId)
  //     .subscribe(res => (this.itemDetails = res));
  // }

  // getBroadcasts() {
  //   this._sellingService
  //     .getUsers(this.itemDetails.product as Product)
  //     .subscribe(data => this.recievedBroadcasts.push(data));
  // }

  // Get details of the related broadcasts
  getRecentBroadcasts() {
    let promise = new Promise((resolve, reject) => {
      this._sellingService
        .getItem(this.itemId)
        .toPromise()
        .then(res => {
          this.itemDetails = res;
          const request = {
            element: this.itemDetails.item[0].category
          };
          this._sellingService
            .getUsers(request as Product)
            .subscribe(
              data => ((this.recievedBroadcasts = data), console.log(data))
            );
        });
    });
    return promise;
  }
}
