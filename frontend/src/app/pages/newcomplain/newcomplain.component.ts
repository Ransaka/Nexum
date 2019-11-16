import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../Auth/auth.service'
import {FormsModule} from '@angular/forms'
import { from } from 'rxjs';

@Component({
  selector: 'app-newcomplain',
  templateUrl: './newcomplain.component.html',
  styleUrls: ['./newcomplain.component.scss']
})
export class NewcomplainComponent implements OnInit {
  userModel = new User('','');
  constructor(
     private auth: AuthService,
     private router: Router,
  ) {}


  ngOnInit() {
    console.log("It works")
  }
  makecomplain(){
     //console.log(this.userModel);
     this.auth.makeComplain(this.userModel).subscribe(response=>{
       this.userModel.complain = response.complain;
       this.userModel.seller = response.seller;
       this.router.navigate(['./userprofile/customerprofile'])
     });
  }

}
class User{
  constructor(
    public seller: string,
    public complain: string,
  ){}
}
