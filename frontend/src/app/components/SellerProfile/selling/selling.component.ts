import { SellingService } from '../../../services/selling.service';
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
    private _selling: SellingService,
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

  error: string;
  category: string;
  product: String;
  textMessage: string;

  sendSelling() {
    this._selling
      .sendSelling({
        category: this.sellingForm.controls['category'].value,
        product: this.sellingForm.controls['product'].value,
        textMessage: this.sellingForm.controls['textMessage'].value
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
