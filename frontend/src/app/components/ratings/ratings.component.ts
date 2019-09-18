import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatingformService } from 'app/services/ratingform.service';
declare const feather: any;
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
  buttonClicked: boolean;
  idlist:any=[];
  constructor(private http: HttpClient, private rateing: RatingformService) { 
    this.reviewlist=[];
     this.datelist=[];
     this.buttonClicked = false
     this.idlist=[];
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
    feather.replace();
    this.getRatings();
  }
  getRatings() {
    let currentUser = localStorage.getItem('current_user');
    this.rateing.getRatings(currentUser).subscribe(
      res => {
        console.log(res);
        this.viewReview(res);
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
    for (let j= 1; j <= ratings.length; j++) {
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
 onLinkClicked(){
  this.buttonClicked = true;
}
}
