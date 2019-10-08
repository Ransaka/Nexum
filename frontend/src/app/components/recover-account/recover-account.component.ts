import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RecoveryService } from 'app/services/recovery.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {
  recoverAccountForm: FormGroup;

  constructor(
    private _formbuilder: FormBuilder,
    private _recovery: RecoveryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isUserAvailable = null;
    this.recoverAccountForm = this._formbuilder.group({
      email: ['', Validators.required]
    });
  }

  email: String;
  error: String;
  isUserAvailable: String;

  sendEmail() {
    this._recovery
      .sendMail({
        email: this.recoverAccountForm.controls['email'].value
      })
      .subscribe(
        res => {
          this.router.navigateByUrl('/');
        },
        err => {
          console.log(err);
          if (err.error.message) {
            this.error = err.error.message;
          }
        }
      );
  }

  send() {
    let promise = new Promise((resolve, reject) => {
      this._recovery
        .checkUser({
          email: this.recoverAccountForm.controls['email'].value
        })
        .toPromise()
        .then(res => {
          if (res == null) {
            this.isUserAvailable = 'false';
          } else {
            this.isUserAvailable = 'true';
            this._recovery
              .sendMail({
                email: this.recoverAccountForm.controls['email'].value
              })
              .subscribe(
                res => {
                  this.router.navigateByUrl('/');
                },
                err => {
                  console.log(err);
                  if (err.error.message) {
                    this.error = err.error.message;
                  }
                }
              );
          }
        });
    });
    return promise;
  }
}
