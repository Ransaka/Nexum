import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms'; 
import { RatingformService } from 'app/services/ratingform.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ratingform',
  templateUrl: './ratingform.component.html',
  styleUrls: ['./ratingform.component.scss'],
})
export class RatingformComponent implements OnInit {

    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;
    ratingForm: FormGroup; 
    morefeedbacksControls: FormArray;
    customerNameChanged: boolean = false;
    customerNameControl;

    constructor(private formBuilder: FormBuilder, private rateing: RatingformService, private router: Router) {
     }

    ngOnInit() {
      this.ratingForm =  this.formBuilder.group({
        rate:['',Validators.required],
        review:['']
      });
    }

    sendrating(){
      const request = {
        
        rate: this.selectedValue,
        review: this.ratingForm.controls['review'].value
      }
      this.rateing.sendRating(request).subscribe(res => {
        this.router.navigateByUrl('/userprofile/customerprofile')
      })

    }


    clearForm() {
      this.ratingForm.reset(); 
    }

    submitFeedbackForm() {
      console.log(this.ratingForm.value);
    }

    countStar(star: number) {
      this.selectedValue = star;
      //console.log('Value of star', star);
    }
      
}
 
 