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
      this.buildFeedbackForm();
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

    tvItem = {
      brand: 'videocon',
      color: 'blue'
    };
  
    buildFeedbackForm() {
      this.ratingForm = this.formBuilder.group({
        customerName: this.formBuilder.control(null, [Validators.required, Validators.minLength(6)]), 
        productPurchased: this.formBuilder.control(null),
        gender: this.formBuilder.control(null),
        email :this.formBuilder.control(null),
        morefeedbacks: this.formBuilder.array([
          this.formBuilder.control(null)
        ]) 
      }, ); 
      this.morefeedbacksControls = this.ratingForm.get('morefeedbacks') as FormArray;
      this.customerNameControl = this.ratingForm.get('customerName');
      this.customerNameControl.valueChanges.subscribe(data => {
      this.customerNameChanged = data && data.toUpperCase().trim() === "TESTING";
      });
    }
    addMoreFeedback() {
      this.morefeedbacksControls.push(this.formBuilder.control(null));
    }
    deleteMoreFeedback(index) {
      this.morefeedbacksControls.removeAt(index);
    }
    clearForm() {
      this.ratingForm.reset(); 
    }
    submitFeedbackForm() {
      console.log(this.ratingForm.value);
    }
    countStar(star: number) {
      this.selectedValue = star;
      console.log('Value of star', star);}
      
}
 
 