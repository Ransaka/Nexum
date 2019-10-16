import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BroadcastService } from './../../services/broadcast.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceptfinalizing',
  templateUrl: './acceptfinalizing.component.html',
  styleUrls: ['./acceptfinalizing.component.scss']
})
export class AcceptfinalizingComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _broadcastService: BroadcastService,
    private _formbuilder: FormBuilder
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
      .subscribe(data => (this.itemDetails = data));
  }

  pay() {
    this._broadcastService
      .payment('hello')
      .subscribe(data => console.log(data));
  }
}
