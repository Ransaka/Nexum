import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RouterModule } from '@angular/router';
import { SellerprofileComponent } from './userprofile/sellerprofile/sellerprofile.component';
import { CustomerprofileComponent } from './Userprofile/customerprofile/customerprofile.component';
import { AdminprofileComponent } from './userprofile/adminprofile/adminprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { BroadcastviewComponent } from './broadcastview/broadcastview.component';
import { PurchasehistoryComponent } from './purchasehistory/purchasehistory.component';

@NgModule({
  declarations: [
    EditDetailsComponent,
    UserprofileComponent,
    SellerprofileComponent,
    CustomerprofileComponent,
    AdminprofileComponent,
    EditprofileComponent,
    BroadcastviewComponent,
    PurchasehistoryComponent
  ],
  imports: [CommonModule, RouterModule, NouisliderModule, NgbModule]
})
export class PagesModule {}
