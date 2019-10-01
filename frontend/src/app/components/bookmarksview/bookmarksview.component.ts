import { Bookmark } from './../../services/bookmark.dto';
import { BookmarkService } from './../../services/bookmark.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarksview',
  templateUrl: './bookmarksview.component.html',
  styleUrls: ['./bookmarksview.component.scss']
})
export class BookmarksviewComponent implements OnInit {
  constructor(private _bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.getBroadcasts();
  }

  BookmarkArray: Bookmark[];
  // Get all broadcasts
  getBroadcasts() {
    this._bookmarkService
      .getBookmarks()
      .subscribe(data => (this.BookmarkArray = data as Bookmark[]));
  }
}
