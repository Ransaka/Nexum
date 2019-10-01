import { BookmarksviewComponent } from './components/bookmarksview/bookmarksview.component';
import { SellingComponent } from './components/selling/selling.component';
import { FinalizingformComponent } from './components/finalizingform/finalizingform.component';
import { SellerreplyComponent } from './components/sellerreply/sellerreply.component';
import { SellerviewComponent } from './pages/sellerview/sellerview.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { AuthGuard } from './Auth/auth.guard';
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { AuthService } from './Auth/auth.service';
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
import { CustomerprofileComponent } from './pages/userprofile/customerprofile/customerprofile.component';
import { SellerprofileComponent } from './pages/userprofile/sellerprofile/sellerprofile.component';
import { AdminprofileComponent } from './pages/userprofile/adminprofile/adminprofile.component';
import { PurchasehistoryComponent } from './pages/purchasehistory/purchasehistory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserprofileComponent,
    BroadcastComponent,
    CustomerprofileComponent,
    SellerprofileComponent,
    AdminprofileComponent,
    EditprofileComponent,
    PurchasehistoryComponent,
    SellerviewComponent,
    SellerreplyComponent,
    FinalizingformComponent,
    SellingComponent,
    BookmarksviewComponent
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
