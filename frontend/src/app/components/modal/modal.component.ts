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

  /*open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService
        .open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else if (modalDimension == undefined && type === 'Login') {
      this.modalService
        .open(content, { windowClass: 'modal-login modal-primary' })
        .result.then(
          result => {
            this.closeResult = `Closed with: ${result}`;
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      this.modalService.open(content).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }*/

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
      password: ['', Validators.required],
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
          password: this.signupForm.controls['password'].value
        })
        .subscribe(
          () => {
            this.router.navigate(['/pages/userprofile']);
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

  login() {
    const request = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    };
    this.auth.login(request).subscribe(
      () => {
        this.router.navigateByUrl('/pages/userprofile');
      },
      err => {
        console.log(err);
        if (err.error.message) {
          this.error = err.error.message;
        }
      }
    );
  }
}

export class ModalComponent {}
