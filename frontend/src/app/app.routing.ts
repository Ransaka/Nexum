import { SellingComponent } from './components/SellerProfile/selling/selling.component';
import { AcceptfinalizingComponent } from './components/FinalizingComponent/acceptfinalizing/acceptfinalizing.component';
import { SellingitemComponent } from './components/SellerProfile/sellingitem/sellingitem.component';
import { FinalizingformviewComponent } from './components/FinalizingComponent/finalizingformview/finalizingformview.component';
import { SellerreplyformComponent } from './components/sellerreplyform/sellerreplyform.component';
import { BookmarksviewComponent } from './components/bookmarksview/bookmarksview.component';
import { FinalizingformComponent } from './components/FinalizingComponent/finalizingform/finalizingform.component';
import { SellerviewComponent } from './pages/sellerview/sellerview.component';
import { SellerreplyComponent } from './components/sellerreply/sellerreply.component';
import { PurchasehistoryComponent } from './pages/purchasehistory/purchasehistory.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { AdminprofileComponent } from './pages/userprofile/adminprofile/adminprofile.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { AuthGuard } from './Auth/auth.guard';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { SellermessageComponent } from './sellermessage/sellermessage.component';

// Customer profile components
import { BroadcastComponent } from './components/CustomerProfile/broadcast/broadcast.component';
import { BroadcastViewMoreComponent } from './components/CustomerProfile/broadcast-view-more/broadcast-view-more.component';

import { ComponentsComponent } from './components/components.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { SellerprofileComponent } from './pages/userprofile/sellerprofile/sellerprofile.component';
import { CustomerprofileComponent } from './pages/userprofile/customerprofile/customerprofile.component';
import { RecoverAccountComponent } from './components/AccountRecovery/recover-account/recover-account.component';
import { RatingformComponent } from './pages/ratingform/ratingform.component';
import { NewcomplainComponent } from './pages/newcomplain/newcomplain.component';
import { ResetPasswordComponent } from './components/AccountRecovery/reset-password/reset-password.component';
import { MoreSellingComponent } from './components/SellerProfile/more-selling/more-selling.component';
import { AddratingandreviewComponent } from './components/RatingsAndReviews/addratingandreview/addratingandreview.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ComponentsComponent },
  {
    path: 'userprofile',
    component: UserprofileComponent,
    children: [
      {
        path: 'customerprofile',
        component: CustomerprofileComponent
      },
      {
        path: 'sellerprofile',
        component: SellerprofileComponent
      }
    ]
  },
  { path: 'sellerview/messages', component: SellermessageComponent },
  { path: 'userprofile/messages', component: MessagesComponent },
  {
    path: 'userprofile/customerprofile/broadcast/viewmore',
    component: BroadcastViewMoreComponent
  },
  { path: 'userprofile/broadcast', component: BroadcastComponent },
  { path: 'userprofile/selling', component: SellingComponent },
  { path: 'userprofile/RatingsComponent', component: RatingsComponent },
  { path: 'userprofile/admin', component: AdminprofileComponent },
  { path: 'userprofile/edit', component: EditprofileComponent },
  { path: 'userprofile/purchasehistory', component: PurchasehistoryComponent },
  { path: 'userprofile/sellerreply', component: SellerreplyComponent },
  { path: 'userprofile/sellerview', component: SellerviewComponent },
  { path: 'userprofile/search/:username', component: SellerviewComponent },
  { path: 'userprofile/sellerreply/:id', component: SellerreplyComponent },
  { path: 'userprofile/sellingitem/:id', component: SellingitemComponent },
  { path: 'userprofile/ratingform', component: RatingformComponent },

  {
    path: 'userprofile/acceptfinalize/:id',
    component: AcceptfinalizingComponent
  },

  {
    path: 'userprofile/finalizingformview/:id',
    component: FinalizingformviewComponent
  },
  {
    path: 'userprofile/finalizingform/:id/:custid',
    component: FinalizingformComponent
  },
  { path: 'userprofile/bookmarks', component: BookmarksviewComponent },
  {
    path: 'userprofile/sellerreplyform/:id',
    component: SellerreplyformComponent
  },

  // Seller profile routes
  { path: 'userprofile/moreselling', component: MoreSellingComponent },
  {
    path: 'userprofile/rateandreview/:seller_id',
    component: AddratingandreviewComponent
  },

  //Account recovery routes
  {
    path: 'recoverAccount',
    component: RecoverAccountComponent
  },
  {
    path: 'userprofile/makecomplain/:sellerid',
    component: NewcomplainComponent
  },
  {
    path: 'userprofile/makecomplain',
    component: NewcomplainComponent
  },

  { path: '**', component: UserprofileComponent },

  { path: 'resetPassword', component: ResetPasswordComponent },

  // Default
  { path: '**', component: CustomerprofileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ComponentsModule
  ],
  exports: []
})
export class AppRoutingModule {}
export const routingComponents = [BroadcastComponent];
