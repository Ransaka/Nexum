import { SellingService } from './../../../services/selling.service';
import { Component, OnInit } from '@angular/core';
import { Selling } from './../../../services/selling.dto';

@Component({
  selector: 'app-more-selling',
  templateUrl: './more-selling.component.html',
  styleUrls: ['./more-selling.component.scss']
})
export class MoreSellingComponent implements OnInit {
  constructor(private _sellingservice: SellingService) {}

  sellingArray = [];

  ngOnInit() {
    this.getSelling();
  }

  // Get all selling
  getSelling() {
    this._sellingservice
      .getSelling()
      .subscribe(data => (this.sellingArray = data as Selling[]));
  }

  // remove a selling
  removeSelling(id) {
    console.log(id);
    this._sellingservice
      .removeSelling(id as string)
      .subscribe(data => this.getSelling());
  }
}
