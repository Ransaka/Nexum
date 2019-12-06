import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';
import { RatingformService } from 'app/services/ratingform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ratingform',
  templateUrl: './ratingform.component.html',
  styleUrls: ['./ratingform.component.scss']
})
export class RatingformComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  ratingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rateing: RatingformService,
    private router: Router
  ) {}

  current_user: String;
  ngOnInit() {
    this.current_user = localStorage.getItem('user_id');

    this.ratingForm = this.formBuilder.group({
      _id: this.current_user,
      rate: ['', Validators.required],
      review: ['']
    });
  }

  sendrating() {
    var current_user = localStorage.getItem('user_id');
    const request = {
      _id: this.current_user,
      rate: this.selectedValue,
      review: this.ratingForm.controls['review'].value
    };
    this.rateing.sendRating(request).subscribe(res => {
      this.router.navigateByUrl('/userprofile/customerprofile');
    });
  }

  clearForm() {
    this.ratingForm.reset();
  }

  submitFeedbackForm() {
    console.log(this.ratingForm.value);
  }

  countStar(star: number) {
    this.selectedValue = star;
    // console.log('Value of star', star);
  }
}
