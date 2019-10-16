import { UserService } from 'app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Auth/auth.service';
import { User, Username } from './../../services/user.dto';

import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    public location: Location,
    private element: ElementRef,
    private router: Router,
    private _auth: AuthService,
    private formbuilder: FormBuilder,
    private _userservice: UserService
  ) {
    this.sidebarVisible = false;
  }

  currentUser: String;
  searchButton: FormGroup;

  ngOnInit() {
    this.currentUser = 'customer';
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

    this.searchButton = new FormGroup({
      search: new FormControl()
    });
  }

  error: string;
  searchRequest: string;
  searchName: string;

  // Search
  searchUser() {
    this.searchName = this.searchButton.controls['search'].value;
    this.router.navigate(['/userprofile/search/' + this.searchName]);
  }

  // Logout
  logout() {
    this._auth.signOut();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  editprofile() {
    this._auth.signOut();
    this.currentUser = null;
    this.router.navigate(['/userprofile/edit']);
  }

  changeUser() {
    if (this.currentUser == 'customer') {
      this.currentUser = 'seller';
      console.log('seller');
    } else {
      this.currentUser = 'customer';
      console.log('customer');
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function() {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '/documentation') {
      return true;
    } else {
      return false;
    }
  }
}