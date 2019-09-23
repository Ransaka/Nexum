import { BroadcastService } from './../../services/broadcast.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})
export class SellingComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private _broadcast: BroadcastService,
    private router: Router
  ) {}

  sellingForm: FormGroup;

  categories = ['Electronics', 'Vehicles', 'Books'];

  ngOnInit() {
    this.sellingForm = this._formbuilder.group({
      category: ['', Validators.required],
      textMessage: ['', Validators.required],
      product: ['', Validators.required]
    });
  }
}
