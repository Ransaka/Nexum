import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RouterModule } from '@angular/router';
import { SellerprofileComponent } from './userprofile/sellerprofile/sellerprofile.component';
import { CustomerprofileComponent } from './Userprofile/customerprofile/customerprofile.component';

@NgModule({
  declarations: [
    EditDetailsComponent,
    UserprofileComponent,
    SellerprofileComponent,
    CustomerprofileComponent
  ],
  imports: [CommonModule, RouterModule, NouisliderModule, NgbModule]
})
export class PagesModule {}
