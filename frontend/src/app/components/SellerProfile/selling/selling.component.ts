import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellingService } from '../../../services/selling.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selling',
  templateUrl: './selling.component.html',
  styleUrls: ['./selling.component.scss']
})
export class SellingComponent implements OnInit {
  constructor(
    private _formbuilder: FormBuilder,
    private _selling: SellingService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  Electronics = [
    'Cell Phones & Accessories',
    'Smart Watches',
    'Video Games & Accessories',
    'Computers & Tablets',
    'Digital Cameras & Photo',
    'Camera Drones',
    'Other electronics'
  ];

  Fashion = [
    "Women's Clothing",
    "Women's Shoes",
    "Men's Clothing",
    "Men's Shoes",
    'Watches',
    'Parts & Accessories',
    'Other fashion items'
  ];

  HealthandBeauty = [
    'Makeup',
    'Health Care',
    'Fragrances',
    'Nail Care',
    'Manicure & Pedicure',
    'Hair Care & Styling',
    'Other products'
  ];

  Motors = [
    'Bikes',
    'Cars',
    'Vans',
    'Other',
    'Car & Truck Parts',
    'Motorcycle Parts',
    'ATV Parts',
    'Scooter Parts',
    'Other vehicle parts'
  ];

  Collectables = [
    'Action Figures',
    'Coins and Paper Money',
    'Stamps',
    'Postcards',
    'Autographed Memorabilia',
    'Sport Memorabilia',
    'Other collectables'
  ];

  Sports = [
    'Cricket',
    'Football',
    'Swimming',
    'Rugger',
    'Basketball',
    'Other sports items'
  ];

  HomeandGarden = [
    'Tools & Workshop Equipment',
    'Yard Equipments',
    'Garden & Outdoor Living',
    'Home Improvement',
    'Baby Items',
    'Kitchen Appliances',
    'Dining & Bar',
    'Lighting & Ceiling Fans',
    'Other equipments'
  ];

  closeResult: string;

  // Open Popup
  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // Get popup removal reason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sellingForm: FormGroup;
  cat: string;
  categories = ['Electronics', 'Vehicles', 'Books'];

  ngOnInit() {
    this.sellingForm = this._formbuilder.group({
      category: ['', Validators.required],
      textMessage: ['', Validators.required]
    });
  }

  error: string;
  category: string;
  product: String;
  textMessage: string;

  sendSelling() {
    this._selling
      .sendSelling({
        category: this.cat,
        textMessage: this.sellingForm.controls['textMessage'].value
      })
      .subscribe(
        () => {
          this.router.navigate(['/userprofile/sellerprofile']);
        },
        err => {
          console.log(err);
          if (err.error.message) {
            this.error = err.error.message;
            window.alert(this.error);
          }
        }
      );
  }

  getCat($var) {
    this.cat = $var;
    this.modalService.dismissAll();
  }

  // Avoid removing category
  eventHandler(event) {
    if (event.code == 'Backspace' || event.code == 'Delete') {
      return false;
    }

    return true;
  }
}
