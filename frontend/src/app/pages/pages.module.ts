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
import { ComplainsComponent } from './complains/complains.component';
import { CustComplainComponent } from './cust-complain/cust-complain.component';
import { FileUploadModule } from 'ng2-file-upload';

import { RatingformComponent } from './ratingform/ratingform.component';

@NgModule({
  declarations: [
    EditDetailsComponent,
    UserprofileComponent,
    SellerprofileComponent,
    CustomerprofileComponent,    
    RatingformComponent,
    CustomerprofileComponent,
    AdminprofileComponent,
    EditprofileComponent,
    ComplainsComponent,
    CustComplainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NouisliderModule,
    NgbModule,
    FileUploadModule
  ]
})
export class PagesModule {}
