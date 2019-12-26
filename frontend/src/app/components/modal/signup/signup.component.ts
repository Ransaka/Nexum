import { Router } from '@angular/router';
import { AuthService } from './../../../Auth/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  signupForm: FormGroup;
  error: string;
  conPass: string;
  signupError: string;
  closeResult: string;

  ngOnInit() {
    this.signupForm = this._formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmpassword: ['', Validators.required]
    });
  }

  // Open popup
  // open(content) {
  //   this.modalService.open(content).result.then(
  //     result => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     reason => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     }
  //   );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  //Signup
  signup() {
    if (
      this.signupForm.controls['password'].value ==
      this.signupForm.controls['confirmpassword'].value
    ) {
      this.auth
        .signUp({
          email: this.signupForm.controls['email'].value,
          username: this.signupForm.controls['username'].value,
          password: this.signupForm.controls['password'].value
        })
        .subscribe(
          res => {
            this.modalService.dismissAll();
            const request = {
              email: this.signupForm.controls['email'].value,
              password: this.signupForm.controls['password'].value
            };
            this.auth.login(request).subscribe(
              res => {
                this.router.navigateByUrl('/userprofile/customerprofile');
                this.modalService.dismissAll();
              },
              err => {
                console.log(err);
                if (err.error.message) {
                  this.error = err.error.message;
                  console.log(this.error);
                }
              }
            );
          },
          err => {
            console.log(err);
            if (err.error.message) {
              this.signupError = err.error.message;
            }
          }
        );
    } else {
      this.conPass = 'True';
    }
  }
}
