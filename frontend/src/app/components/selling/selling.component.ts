import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})
export class SellingComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      Laptops : this.fb.array([]),
      Televisions : this.fb.array([]),
      Hometheatres : this.fb.array([]),
      Vehicles : this.fb.array([]),
      Other : this.fb.array([])
    })
  }

  selectTheType (typeOFTheProduct : string) {
    if (typeOFTheProduct === 'Laptops' || typeOFTheProduct === 'Televisions'){
      (<FormArray>this.employeeForm.get('Laptops')).push(this.typeLaptopOrTelevision())
    }if (typeOFTheProduct === 'Vehicles'){
      (<FormArray>this.employeeForm.get('Vehicles')).push(this.typeVehicle())
    }
  }

  typeLaptopOrTelevision (){
    return this.fb.group({
      BrandName : ['', Validators.required],
      ModelName : ['', Validators.required],
      Price : ['', Validators.required],
      User : ['', Validators.required],
      Performance : ['', Validators.required],
      OtherFeatures : ['', Validators.required]
    })
  }

  typeTelevision (){
    console.log("Hello kavinda");
  }

  typeHometheatre (){

  }

  typeVehicle (){
    return this.fb.group({
      BrandName : ['', Validators.required],
      Model : ['', Validators.required],
      Price : ['', Validators.required],
      User : ['', Validators.required],
      EngineCapasity : ['', Validators.required],
      OtherFeatures : ['', Validators.required]
    })
  }

  typeOther (){

  }



}
