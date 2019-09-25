import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserView, Username } from './../../services/user.dto';

@Component({
  selector: 'app-sellerview',
  templateUrl: './sellerview.component.html',
  styleUrls: ['./sellerview.component.scss']
})
export class SellerviewComponent implements OnInit {
  constructor(
    private _userservice: UserService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  error: string;
  username: string;
  user: any;

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['username'] !== 'undefined') {
        this.username = params['username'];
      } else {
        this.username = '';
      }
    });
    console.log('seller :' + this.username);
    this.searchUser();
  }

  searchUser() {
    this._userservice.search(this.username).subscribe(
      res => {
        this.user = res;
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
