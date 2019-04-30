import { AuthService } from './../../auth.service';
import {Component, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html'
})
export class NgbdModalBasic {
    closeResult: string;

    constructor(private modalService: NgbModal, private _auth : AuthService) {}
    
    userData = {}

    open(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension == undefined && type === 'Login') {
          this.modalService.open(content, { windowClass: 'modal-login modal-primary' }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

    }


    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    custsignin(){
        this._auth.signinCust(this.userData)
        .subscribe(
            res => console.log(res),
            err => console.log(err)
        ) 
    }

    sellerlogin(){
        this._auth.signinSeller(this.userData)
        .subscribe(
            res => console.log(res),
            err => console.log(err)
        ) 
    }

                        
    loginUserData = {}
    login(){
        this._auth.login(this.userData)
        .subscribe(
            res => console.log(res),
            err => console.log(err)
        ) 
    }
    
}

export class ModalComponent { }

