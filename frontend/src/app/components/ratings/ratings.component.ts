import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatingformService } from 'app/services/ratingform.service';
import {ReplyformService } from 'app/services/reply.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms'; 
import { Pipe, PipeTransform } from '@angular/core';
import { DateAgoPipe } from 'app/pipes/date-ago.pipe';
export interface Message {
  text: string;
  name: string;

}
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  reviewlist:any=[];
  datelist:any=[];
  buttonClicked: number;
  idlist:any=[];
  numlist:any=[] ;
  namelist:any=[];
  replylist:any=[];
  timelist:any=[];
  replyForm: FormGroup; 
  
  constructor(private http: HttpClient, private rateing: RatingformService,private formBuilder: FormBuilder,private replying:ReplyformService  , private router: Router) { 
    this.reviewlist=[];
     this.datelist=[];
     this.buttonClicked;
     this.idlist=[];
     this.numlist=[];
     this.timelist=[];
     this.namelist=[];
     this.replylist=[];
  }
  @Output() onSendMessage: EventEmitter<Message> = new EventEmitter();
  message = {
    name: '',
    text: ''
  };
  sendMessage() {
    if (this.message.text !== '' && this.message.name !== '') {
      this.http
        .post(`http://localhost:4200/messages`, this.message)
        .subscribe((res: Message) => {
          this.onSendMessage.emit(res);
          this.message = {
            name: '',
            text: ''
          };
        });
    }
  }
  messages: Array<Message> = [];
   

  
  ngOnInit() {
     
    this.getRatings();
    this.getreply();
    var current_user = localStorage.getItem("user_id");

      this.replyForm =  this.formBuilder.group({
        _id: current_user, 
        nom:[''],
        name:[''],
        reply:['']
      });

  }
  getRatings() {
    let currentUser = localStorage.getItem('user_id');
    this.rateing.getRatings(currentUser).subscribe(
      res => {
        console.log(res);
        this.viewReview(res);
      },
      err => {}
    );
  }
  getreply() {
    let currentUser = localStorage.getItem('user_id');
    this.replying.getreply(currentUser).subscribe(
      res => {
        console.log(res);
        this.viewReply(res);
      },
      err => {}
    );
  }

   viewReview(ratings){
     if (ratings) {
       let idea = null; 
       let day;
       let k=0;
       let no;
    for (let j= 0; j < ratings.length; j++) {
             
             idea=ratings[j].review;
            day=ratings[j].date;
            no=ratings[j]._id;
       if(idea==null){
       }else{
        k++;
      this.reviewlist[k]= idea;
      this.datelist[k]=day;
      this.idlist[k]=no; 
     }
       // this.review= ratings[j].review;
       // this.date[k]=ratings[j].date;
     }
  }
 }
 onLinkClicked(NIC){
  this.buttonClicked = NIC;
}
submitreplyForm() {
  console.log(this.replyForm.value);
} 
sendreply() {
      
  var current_user = localStorage.getItem("user_id");
  const request = {
    _id: current_user,
    nom: this.buttonClicked,
    name: this.replyForm.controls['name'].value ,
    reply: this.replyForm.controls['reply'].value
  }
  this.replying.sendreply(request).subscribe(res => {
    this.router.navigateByUrl('/userprofile/customerprofile')
  }) 

}  
viewReply(replying){
   
  let k=0; 
  let my;
  let nic ;
  let numb;  
 for (let j= 0; j < replying.length; j++) {
   
      k++;
   this.namelist[k]=replying[j].name;
   this.replylist[k]=replying[j].reply; 
   this.timelist[k]=replying[j].date;
   this.numlist[k]=replying[j].nom; 
  }}
}
