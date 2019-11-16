import { Router } from '@angular/router';
import { AuthService } from './../../../Auth/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  closeResult: string;
  user: any;

  constructor(
    private formbuilder: FormBuilder,
    private modalService: NgbModal,
    private auth: AuthService,
    private router: Router
  ) {}

  // Open popup
  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      log_email: ['', Validators.required],
      log_password: ['', Validators.required]
    });
  }

  error: string;
  log_email: String; // User email
  log_password: String; // User password

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Login
  login() {
    const request = {
      email: this.loginForm.controls['log_email'].value,
      password: this.loginForm.controls['log_password'].value
    };
    this.auth.login(request).subscribe(
      res => {
        this.router.navigateByUrl('/userprofile/customerprofile');
        this.modalService.dismissAll();
      },
      err => {
        if (err.error.message) {
          this.error = err.error.message;
          console.log(this.error);
        }
      }
    );
  }
}
