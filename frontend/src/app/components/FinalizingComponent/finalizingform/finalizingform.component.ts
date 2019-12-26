import { UserService } from 'app/services/user.service';
import { Finalizing } from '../../../services/selling.dto';
import { SellingService } from '../../../services/selling.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-finalizingform',
  templateUrl: './finalizingform.component.html',
  styleUrls: ['./finalizingform.component.scss']
})
export class FinalizingformComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _broadcastService: BroadcastService,
    private _sellingService: SellingService,
    private _userService: UserService
  ) {}

  itemId: string;
  finalizingForm: FormGroup;
  itemDetails: any;
  broadcastData: any;
  error: string;
  date: any;

  // Customer details
  custId: string;
  custName: any;

  //Seller details
  sellerName: string;
  sellerId: string;

  today: number = Date.now();
  total: number;

  ngOnInit() {
    this.sellerId = localStorage.getItem('user_id');
    this.finalizingForm = this._formbuilder.group({
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      tax: ['', Validators.required],
      textMessage: ['']
    });

    var price = this.finalizingForm.controls['price'].value;
    var quantity = this.finalizingForm.controls['quantity'].value;
    var tax = this.finalizingForm.controls['tax'].value;

    this.total = price * quantity + price * quantity * (tax / 100);

    this._activatedRoute.params.subscribe(params => {
      if (
        typeof params['id'] !== 'undefined' &&
        typeof params['custid'] !== 'undefined'
      ) {
        this.itemId = params['id'];
        this.custId = params['custid'];
      } else {
        this.itemId = '';
        this.custId = '';
      }
    });

    this.getItem();
    this.getName();
    this.getCustomer();
  }

  // Get item details
  getItem() {
    this._sellingService
      .getItem(this.itemId)
      .subscribe(data => (this.itemDetails = data));
  }

  // Get seller name
  getName() {
    this._userService
      .collectCurrent()
      .subscribe(data => (this.sellerName = data.username));
  }

  // Get customer name
  getCustomer() {
    this._userService
      .gettUserById({ _id: this.custId })
      .subscribe(data => (this.custName = data));
  }

  //Forward the finalizing component to the customer
  sendFinalizingForm() {
    var total_no_tax =
      this.finalizingForm.controls['price'].value *
      this.finalizingForm.controls['quantity'].value;
    var total =
      total_no_tax +
      total_no_tax * (this.finalizingForm.controls['tax'].value / 100);
    console.log(total);
    this._sellingService
      .sendFinalizing({
        productId: this.itemId,
        product: this.itemDetails.item[0].product,
        category: this.itemDetails.item[0].category,
        tags: this.itemDetails.item[0].tags,
        customerId: this.custId,
        sellerName: this.sellerName,
        price: this.finalizingForm.controls['price'].value,
        quantity: this.finalizingForm.controls['quantity'].value,
        tax: this.finalizingForm.controls['tax'].value,
        textMessage: this.finalizingForm.controls['textMessage'].value,
        total: total
      })
      .subscribe(
        () => {
          this.router.navigate(['/userprofile/sellerprofile']);
        },
        err => {
          console.log(err);
          if (err.error.message) {
            this.error = err.error.message;
            window.alert(this.error);
          }
        }
      );
  }
}
