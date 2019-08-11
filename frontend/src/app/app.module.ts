import { AuthGuard } from './Auth/auth.guard';
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClient } from 'selenium-webdriver/http';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ShowCustomerDetailsComponent } from './customer_details/show-customer-details/show-customer-details.component';
import { EditCustomerDetailsComponent } from './customer_details/edit-customer-details/edit-customer-details.component';
import { AddNewCustomerDetailsComponent } from './customer_details/add-new-customer-details/add-new-customer-details.component';
import { SellerItemsComponent } from './seller-items/seller-items.component';
import { ShowItemsComponent } from './Seller_items/show-items/show-items.component';
import { EditItemsComponent } from './Seller_items/edit-items/edit-items.component';
import { AddNewItemComponent } from './Seller_items/add-new-item/add-new-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserprofileComponent,
    BroadcastComponent,
    CustomerDetailsComponent,
    ShowCustomerDetailsComponent,
    EditCustomerDetailsComponent,
    AddNewCustomerDetailsComponent,
    SellerItemsComponent,
    ShowItemsComponent,
    EditItemsComponent,
    AddNewItemComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    ExamplesModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
