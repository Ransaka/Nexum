import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AccountRecoveryService } from './../../../services/AccountRecoveryServices/account-recovery.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private _resetUserService: AccountRecoveryService,
    private _formbuilder: FormBuilder,
    private router: Router
  ) {}

  resetPasswordForm: FormGroup;
  confirmationError: boolean;

  ngOnInit() {
    this.resetPasswordForm = this._formbuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      cpassword: ['', Validators.required]
    });
  }

  //Get user by email
  resetUserAccount() {
    if (
      this.resetPasswordForm.controls['password'].value ==
      this.resetPasswordForm.controls['cpassword'].value
    ) {
      this._resetUserService
        .sendResetUser({
          email: this.resetPasswordForm.controls['email'].value,
          password: this.resetPasswordForm.controls['password'].value
        })
        .subscribe(() => this.router.navigateByUrl('/'));
    } else {
      this.confirmationError = true;
    }
  }
}
