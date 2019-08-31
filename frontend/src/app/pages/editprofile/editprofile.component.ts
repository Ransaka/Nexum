import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from './../../services/user.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private _userservice: UserService,
    private formbuilder: FormBuilder
  ) {}

  current_user: User;

  ngOnInit() {
    this.editForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      telephone: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required]
    });

    this.getUser();
  }

  getUser() {
    return this._userservice
      .collectCurrent()
      .subscribe(res => (this.current_user = res));
  }
}
