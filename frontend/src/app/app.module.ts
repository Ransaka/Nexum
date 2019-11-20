import { FooterComponent } from './shared/footer/footer.component';
import { AcceptfinalizingComponent } from './components/FinalizingComponent/acceptfinalizing/acceptfinalizing.component';
import { SellingitemComponent } from './components/SellerProfile/sellingitem/sellingitem.component';
import { FinalizingformviewComponent } from './components/FinalizingComponent/finalizingformview/finalizingformview.component';
import { SellerreplyformComponent } from './components/sellerreplyform/sellerreplyform.component';
import { BookmarksviewComponent } from './components/bookmarksview/bookmarksview.component';
import { SellingComponent } from './components/SellerProfile/selling/selling.component';
import { FinalizingformComponent } from './components/FinalizingComponent/finalizingform/finalizingform.component';
import { SellerreplyComponent } from './components/sellerreply/sellerreply.component';
import { SellerviewComponent } from './pages/sellerview/sellerview.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { AuthGuard } from './Auth/auth.guard';
import { BroadcastComponent } from './components/CustomerProfile/broadcast/broadcast.component';
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
import { AgmCoreModule } from '@agm/core';
import { RatingformComponent } from './pages/ratingform/ratingform.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CustomerprofileComponent } from './pages/userprofile/customerprofile/customerprofile.component';
import { SellerprofileComponent } from './pages/userprofile/sellerprofile/sellerprofile.component';
import { AdminprofileComponent } from './pages/userprofile/adminprofile/adminprofile.component';
import { PurchasehistoryComponent } from './pages/purchasehistory/purchasehistory.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { RatingsComponent } from './components/ratings/ratings.component';

// Customer profile components
import { BroadcastViewMoreComponent } from './components/CustomerProfile/broadcast-view-more/broadcast-view-more.component';

//Seller profile components
import { MoreSellingComponent } from './components/SellerProfile/more-selling/more-selling.component';

//Other imports
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

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
    BookmarksviewComponent,
    SellerreplyformComponent,
    FinalizingformviewComponent,
    SellingitemComponent,
    AcceptfinalizingComponent,
    RatingformComponent,
    DateAgoPipe,
    RatingsComponent, 
    BroadcastViewMoreComponent,
    MoreSellingComponent,
    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDU2U5KdAzMj0ZP6584UzKlZH0tGFT9feg'
    }),
    ScrollToModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
