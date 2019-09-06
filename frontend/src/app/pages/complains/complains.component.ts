import { Component, OnInit } from '@angular/core';
import{Http} from '@angular/http';
import { AuthService } from '../../Auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.scss']
})
export class ComplainsComponent implements OnInit {

  complainform: FormGroup;

  constructor(
    private auth: AuthService
    ) {
    //   this.complainform = new FormGroup({
    //     complain: new FormControl()
    //  });
    }

  ngOnInit() {
  }


  // complain : string;

//  makeComplain(){
//   var current_user = JSON.parse(localStorage.getItem("current_user"));
//    this.auth.makeComplain({
//      id:current_user.id,
//     complain: this.complainform.controls['complain'].value,
//    }).subscribe();
//    console.log(this.complain);
//  }

}
