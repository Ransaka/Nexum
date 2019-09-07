import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from './../../services/user.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private _userservice: UserService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  current_user: User;

  ngOnInit() {
    this.editForm = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      nic: ['', Validators.required],
      telephone: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required]
    });

    this.getUser();
  }
  _id = '5d4a8b5d7e6ecf5efcb9a65a';
  // Get user details
  getUser() {
    return this._userservice
      .collectCurrent()
      .subscribe(res => (this.current_user = res));
  }

  updateUser() {
    const request = {
      uid: this._id,
      firstname: this.editForm.controls['firstname'].value,
      lastname: this.editForm.controls['lastname'].value,
      username: this.editForm.controls['username'].value,
      email: this.editForm.controls['email'].value,
      password: this.editForm.controls['password'].value,
      cpassword: this.editForm.controls['cpassword'].value,
      nic: this.editForm.controls['nic'].value,
      telephone: this.editForm.controls['telephone'].value,
      line1: this.editForm.controls['line1'].value,
      line2: this.editForm.controls['line2'].value,
      line3: this.editForm.controls['line3'].value
    };
    return this._userservice
      .updatetUser(request)
      .subscribe(res => this.router.navigate(['/userprofile/customerprofile']));
  }

  //Set user details
}
