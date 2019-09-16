import { BroadcastService } from './../../services/broadcast.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private _broadcast: BroadcastService,
    private router: Router
  ) {}

  broadcastForm: FormGroup;
  ngOnInit() {
    this.broadcastForm = this._formbuilder.group({
      category: ['', Validators.required],
      product: ['', Validators.required],
      textMessage: ['']
    });
  }
  error: string;
  category: string;
  product: String;
  textMessage: string;
  categories = ['Electronics', 'Vehicles', 'Books', 'Other'];

  newBroadcast() {
    this._broadcast
      .sendBroadcast({
        category: this.broadcastForm.controls['category'].value,
        product: this.broadcastForm.controls['product'].value,
        textMessage: this.broadcastForm.controls['textMessage'].value
      })
      .subscribe(
        () => {
          this.router.navigate(['/userprofile/customerprofile']);
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
