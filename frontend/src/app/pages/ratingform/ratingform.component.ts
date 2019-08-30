import { Component, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-ratingform',
  templateUrl: './ratingform.component.html',
  styleUrls: ['./ratingform.component.scss'],
})
export class RatingformComponent implements OnInit {

  //formRating=0;
  stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;
  
    constructor() { }
    
    ngOnInit() {
    }
    
    countStar(star: number) {
      this.selectedValue = star;
      console.log('Value of star', star);}
      
}
 
 