import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BroadcastService } from '../../../services/broadcast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'app/services/history.service';

@Component({
  selector: 'app-acceptfinalizing',
  templateUrl: './acceptfinalizing.component.html',
  styleUrls: ['./acceptfinalizing.component.scss']
})
export class AcceptfinalizingComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _broadcastService: BroadcastService,
    private _formbuilder: FormBuilder,
    private _history: HistoryService,
    private router: Router
  ) {}

  itemId: string;
  itemDetails: any;
  finalizingForm: FormGroup;

  ngOnInit() {
    this.finalizingForm = this._formbuilder.group({
      price: ['', Validators.required],
      textMessage: ['']
    });

    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.itemId = params['id'];
      } else {
        this.itemId = '';
      }
    });

    this.getBroadcast();
  }

  getBroadcast() {
    this._broadcastService
      .getFormById(this.itemId)
      .subscribe(data => ((this.itemDetails = data), console.log(data)));
  }

  pay() {
    this._broadcastService
      .payment({
        amount: this.itemDetails.item[0].total,
        seller: this.itemDetails.item[0].sellerName
      })
      .subscribe(data => window.location.replace(data.url));
  }

  accept() {
    var acceptDetails = {
      sellerName: this.itemDetails.item[0].sellerName,
      sellerId: this.itemDetails.item[0].sellerId,
      dateOfIssue: this.itemDetails.item[0].date,
      productID: this.itemDetails.item[0]._id,
      category: this.itemDetails.item[0].category,
      tags: this.itemDetails.item[0].tags,
      price: this.itemDetails.item[0].price,
      quantity: this.itemDetails.item[0].quantity,
      tax: this.itemDetails.item[0].tax,
      total: this.itemDetails.item[0].total,
      sellerMessage: this.itemDetails.item[0].textMessage
    };
    this._history
      .sendForm(acceptDetails)
      .subscribe(() => this.router.navigate(['/userprofile/customerprofile']));
  }

  rateAndReview() {}
}
