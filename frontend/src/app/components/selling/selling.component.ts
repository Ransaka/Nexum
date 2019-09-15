import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})
export class SellingComponent implements OnInit {
  employeeForm: FormGroup;
  selectedFile : File = null;
  constructor(private fb : FormBuilder, private http : HttpClient) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      Laptops : this.fb.array([]),
      Televisions : this.fb.array([]),
      Hometheatres : this.fb.array([]),
      Vehicles : this.fb.array([]),
      Other : this.fb.array([])
    })
  }

  getTheImage (event){
    this.selectedFile = event.target.files[0];
    // console.log(event);
  }

  toUploadTheImage (){
    const fd = new FormData();
    this.http.post('currentUrl/upload', fd).subscribe(res => {
      console.log(res);
    })
  }
}
