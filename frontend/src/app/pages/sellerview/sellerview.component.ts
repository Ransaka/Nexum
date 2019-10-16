import { BroadcastService } from './../../services/broadcast.service';
import { BookmarkService } from './../../services/bookmark.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserView, Username } from './../../services/user.dto';
import { Observable } from 'rxjs';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-sellerview',
  templateUrl: './sellerview.component.html',
  styleUrls: ['./sellerview.component.scss']
})
export class SellerviewComponent implements OnInit {
  constructor(
    private _userservice: UserService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _bookmarkService: BookmarkService,
    private _broadcastService: BroadcastService
  ) {}

  lat = 51.678418;
  lng = 7.809007;

  bookmarkAdded: boolean;
  error: string;
  username: string;
  user: any;

  ngOnInit() {
    this.bookmarkAdded = false;
    this.getUsernameFromParams();
    this.searchUser();
  }

  getUsernameFromParams() {
    this._activatedRoute.params.subscribe(params => {
      if (typeof params['username'] !== 'undefined') {
        this.username = params['username'];
      } else {
        this.username = '';
      }
    });
  }

  // Search a user
  searchUser() {
    this._userservice.search(this.username).subscribe(
      res => {
        this.user = res;
        this.isBookmaked();
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

  // Add a bookmark
  addBookmark() {
    this.bookmarkAdded = true;
    const request = {
      userID: this.user._id,
      username: this.user.username
    };
    return this._bookmarkService
      .addBookmark(request)
      .subscribe(() => this.bookmarkAdded);
  }

  removeBookmark() {
    this.bookmarkAdded = false;
    return this._bookmarkService
      .removeBookmark(this.user._id)
      .subscribe(() => console.log('removed'));
  }

  // Find if bookmarked
  isBookmaked() {
    const request = {
      userid: this.user._id
    };
    if (request) {
      this._bookmarkService
        .isBookmaked(request)
        .subscribe(data => (this.bookmarkAdded = data.value));
    } else {
      console.log('No id');
    }
  }
}
