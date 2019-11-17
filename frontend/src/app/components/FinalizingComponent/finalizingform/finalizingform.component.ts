import { UserService } from 'app/services/user.service';
import { Finalizing } from '../../../services/selling.dto';
import { SellingService } from '../../../services/selling.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  custId: string;
  finalizingForm: FormGroup;
  itemDetails: any;
  broadcastData: any;
  error: string;
  sellerName: string;
  sellerId: string;

  ngOnInit() {
    this.finalizingForm = this._formbuilder.group({
      price: ['', Validators.required],
      textMessage: ['']
    });

    this._activatedRoute.params.subscribe(params => {
      if (
        typeof params['id'] !== 'undefined' &&
        typeof params['custid'] !== 'undefined'
      ) {
        this.itemId = params['id'];
        this.custId = params['custid'];
        this._userService
          .gettUserById({
            _id: localStorage.getItem('user_id')
          })
          .subscribe(data => console.log(data));
      } else {
        this.itemId = '';
        this.custId = '';
      }
    });

    this.getItem();
    this.getName();
  }

  // Get item details
  getItem() {
    this._sellingService
      .getItem(this.itemId)
      .subscribe(data => (this.itemDetails = data));
  }

  getName() {
    this._userService
      .collectCurrent()
      .subscribe(data => (this.sellerName = data.username));
  }

  //Forward the finalizing component to the customer
  sendFinalizingForm() {
    this._sellingService
      .sendFinalizing({
        productId: this.itemId,
        product: this.itemDetails.item[0].product,
        category: this.itemDetails.item[0].category,
        tags: this.itemDetails.item[0].tags,
        customerId: this.custId,
        sellerName: this.sellerName,
        price: this.finalizingForm.controls['price'].value,
        textMessage: this.finalizingForm.controls['textMessage'].value
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
