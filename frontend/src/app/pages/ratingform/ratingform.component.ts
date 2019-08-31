import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-ratingform',
  templateUrl: './ratingform.component.html',
  styleUrls: ['./ratingform.component.scss'],
})
export class RatingformComponent implements OnInit {

  //formRating=0;
  stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;
    feedbackForm: FormGroup; // Declaring a variable of type FormGroup
    morefeedbacksControls: FormArray;
    customerNameChanged: boolean = false;
    customerNameControl;
    constructor(private formBuilder: FormBuilder) {
      this.buildFeedbackForm();
     }
    
    ngOnInit() {
    }
    tvItem = {
      brand: 'videocon',
      color: 'blue'
    };
  
    buildFeedbackForm() {
      // Building the Feedback Form Group
      this.feedbackForm = this.formBuilder.group({
        // customerName: new FormControl() // arguments: val, validator
        customerName: this.formBuilder.control(null, [Validators.required, Validators.minLength(6)]), // same as above but expects null by default
        productPurchased: this.formBuilder.control(null),
        // productPurchased: this.formBuilder.control('Washing Machine'), // default value setting
    
          // Nested Form Group
        gender: this.formBuilder.control(null),
        // gender: this.formBuilder.control('Male'), // default value setting
        productQuality: this.formBuilder.control(null), // Radio buttons - formcontrol
        morefeedbacks: this.formBuilder.array([
          this.formBuilder.control(null)
        ]) // Form array for dynamic form elements
      },
       ); // Form Builder uses a group of form controls to create a Form Group
  
      // Building the FormArray Control
      this.morefeedbacksControls = this.feedbackForm.get('morefeedbacks') as FormArray;
  
      // Creating customer name control
      this.customerNameControl = this.feedbackForm.get('customerName');
  
      // Subscribe to valueChanges event for customer Name
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
      /*this.feedbackForm.reset({
        customerName: 'Kiran Kumar Dash' // Default name on clearing out form
      });*/
      this.feedbackForm.reset(); // Resets the formgroup
    }
  
    submitFeedbackForm() {
      console.log(this.feedbackForm.value);
    }
    countStar(star: number) {
      this.selectedValue = star;
      console.log('Value of star', star);}
      
}
 
 