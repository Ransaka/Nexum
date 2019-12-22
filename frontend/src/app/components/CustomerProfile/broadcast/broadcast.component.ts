import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BroadcastService } from '../../../services/broadcast.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
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

  constructor(
    private modalService: NgbModal,
    private _formbuilder: FormBuilder,
    private _broadcast: BroadcastService,
    private router: Router
  ) {}

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

  broadcastForm: FormGroup;

  ngOnInit() {
    // Broadcast component
    this.broadcastForm = this._formbuilder.group({
      product: ['', Validators.required],
      textMessage: ['']
    });
  }

  error: string;
  category: string;
  product: String;
  textMessage: string;
  cat: string;

  // Send a new broadcast
  sendBroadcast() {
    this._broadcast
      .sendBroadcast({
        category: this.cat,
        textMessage: this.broadcastForm.controls['textMessage'].value
      })
      .subscribe(
        () => {
          this.router.navigate(['/userprofile/customerprofile']);
        },
        err => {
          if (err.error) {
            this.error = err.error;
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
