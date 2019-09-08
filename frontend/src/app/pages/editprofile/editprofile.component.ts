import { HttpClient } from '@angular/common/http';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from './../../services/user.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/user/upload'
  });

  editForm: FormGroup;
  constructor(
    private _userservice: UserService,
    private formbuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal
  ) {}

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  selectedFile: File = null;
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http
      .post('http://localhost:3000/user/upload', fd)
      .subscribe(res => console.log(res));
  }

  current_user: User;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeResult: string;
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
  // Get user details
  getUser() {
    return this._userservice
      .collectCurrent()
      .subscribe(res => (this.current_user = res));
  }

  updateUser() {
    const request = {
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
      .subscribe(() => this.router.navigate(['/userprofile/customerprofile']));
  }

  //Set user details
}
