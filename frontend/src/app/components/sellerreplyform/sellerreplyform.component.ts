import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellerreplyform',
  templateUrl: './sellerreplyform.component.html',
  styleUrls: ['./sellerreplyform.component.scss']
})
export class SellerreplyformComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {}

  finalizingForm: FormGroup;
  id: string;

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
      } else {
        this.id = '';
      }
    });

    this.finalizingForm = this._formbuilder.group({
      price: ['', Validators.required],
      textMessage: ['']
    });
  }
}
