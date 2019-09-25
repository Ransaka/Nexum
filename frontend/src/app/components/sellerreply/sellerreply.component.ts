import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellerreply',
  templateUrl: './sellerreply.component.html',
  styleUrls: ['./sellerreply.component.scss']
})
export class SellerreplyComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {}

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
  }
}
