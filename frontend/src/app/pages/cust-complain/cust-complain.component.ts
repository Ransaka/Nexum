import { Component, OnInit } from '@angular/core';
import{Http} from '@angular/http';
import { AuthService } from '../../Auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-cust-complain',
  templateUrl: './cust-complain.component.html',
  styleUrls: ['./cust-complain.component.scss']
})
export class CustComplainComponent implements OnInit {

  complainform: FormGroup;


  constructor(
    private auth: AuthService
    ) {
      this.complainform = new FormGroup({
        complain: new FormControl(),
        seller : new FormControl(),
        item : new  FormControl()
     });
    }

  ngOnInit() {
  }

  item = ['Electronics', 'Vehicles', 'Books'];
  seller = ['seller 1', 'seller 2', 'selller 3'];
  complain : string;

 makeComplain(){
  var current_user = JSON.parse(localStorage.getItem("current_user"));
  //  this.auth.makeComplain({
  //    id:current_user.id,
  //   complain: this.complainform.controls['complain'].value,
  //  }).subscribe();
   console.log(this.complain);
 }

}
