import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { TypographyComponent } from './typography/typography.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
import { SigninComponent } from './signin/signin.component';
//import { SellingComponent } from './selling/selling.component';
import { RatingsComponent } from './ratings/ratings.component';
import { SellerreplyformComponent } from './sellerreplyform/sellerreplyform.component';
//import { BookmarksviewComponent } from './bookmarksview/bookmarksview.component';
//import { FinalizingformComponent } from './finalizingform/finalizingform.component';
//import { SellerreplyComponent } from './sellerreply/sellerreply.component';
//import { BroadcastComponent } from './broadcast/broadcast.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    JwBootstrapSwitchNg2Module,
    ReactiveFormsModule
  ],
  declarations: [
    ComponentsComponent,
    TypographyComponent,
    NotificationComponent,
    NgbdModalBasic,
    SigninComponent,
    //SellingComponent,
    RatingsComponent,
    SellerreplyformComponent
    //BookmarksviewComponent
    //FinalizingformComponent
    //SellerreplyComponent
    //BroadcastComponent
  ],
  exports: [ComponentsComponent]
})
export class ComponentsModule {}
