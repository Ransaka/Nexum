import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RouterModule } from '@angular/router';
import { SellerprofileComponent } from './userprofile/sellerprofile/sellerprofile.component';
import { CustomerprofileComponent } from './Userprofile/customerprofile/customerprofile.component';
import { AdminprofileComponent } from './userprofile/adminprofile/adminprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { BroadcastviewComponent } from './broadcastview/broadcastview.component';
import { PurchasehistoryComponent } from './purchasehistory/purchasehistory.component';
import { SellerviewComponent } from './sellerview/sellerview.component';
import { NonRegisteredSellerViewComponent } from './non-registered-seller-view/non-registered-seller-view.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserprofileComponent,
    SellerprofileComponent,
    CustomerprofileComponent,
    AdminprofileComponent,
    EditprofileComponent,
    BroadcastviewComponent,
    PurchasehistoryComponent,
    SellerviewComponent,
    NonRegisteredSellerViewComponent,
    EditprofileComponent
    
  ],
  imports: [CommonModule, RouterModule, NouisliderModule, NgbModule,ReactiveFormsModule]
})
export class PagesModule {}
