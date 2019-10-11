import { SellingitemComponent } from './components/sellingitem/sellingitem.component';
import { FinalizingformviewComponent } from './components/finalizingformview/finalizingformview.component';
import { SellerreplyformComponent } from './components/sellerreplyform/sellerreplyform.component';
import { BookmarksviewComponent } from './components/bookmarksview/bookmarksview.component';
import { FinalizingformComponent } from './components/finalizingform/finalizingform.component';
import { SellerviewComponent } from './pages/sellerview/sellerview.component';
import { SellerreplyComponent } from './components/sellerreply/sellerreply.component';
import { PurchasehistoryComponent } from './pages/purchasehistory/purchasehistory.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { AdminprofileComponent } from './pages/userprofile/adminprofile/adminprofile.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { SellingComponent } from './components/selling/selling.component';
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { AuthGuard } from './Auth/auth.guard';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { SellerprofileComponent } from './pages/userprofile/sellerprofile/sellerprofile.component';
import { CustomerprofileComponent } from './pages/userprofile/customerprofile/customerprofile.component';
import { RecoverAccountComponent } from './components/recover-account/recover-account.component';

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

  {
    path: 'userprofile/finalizingform/:id',
    component: FinalizingformComponent
  },
  { path: 'userprofile/bookmarks', component: BookmarksviewComponent },
  {
    path: 'userprofile/sellerreplyform/:id',
    component: SellerreplyformComponent
  },
  {
    path: 'userprofile/finalizingformview',
    component: FinalizingformviewComponent
  },
  {
    path: 'recoverAccount',
    component: RecoverAccountComponent
  },
  { path: '**', component: UserprofileComponent }
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
