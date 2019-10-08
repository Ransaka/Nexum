import { AuthService } from '../../Auth/auth.service';
import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html'
})
export class NgbdModalBasic {
  closeResult: string;
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private auth: AuthService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formbuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmpassword: ['', Validators.required]
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  error: string;

  email: String;
  username: String;
  password: String;
  confirmpassword: String;

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
          () => {
            this.router.navigate(['/userprofile/customerprofile']);
          },
          err => {
            console.log(err);
            if (err.error.message) {
              this.error = err.error.message;
              window.alert(this.error);
            }
          }
        );
    } else {
      window.alert('Unable to confirm the passwords');
    }
  }

  //Login
  login() {
    const request = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.auth.login(request).subscribe(
      res => {
        this.router.navigateByUrl('/userprofile/customerprofile');
      },
      err => {
        console.log(err);
        if (err.error.message) {
          this.error = err.error.message;
        }
      }
    );
  }

  //Signout
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');

    //this.user.removeCurrent();
  }
}

export class ModalComponent {}
