import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalBasic } from './modal/modal.component';
import { SigninComponent } from './signin/signin.component';
import { SellingComponent } from './selling/selling.component';
import { RatingsComponent } from './ratings/ratings.component';
import { PurchasehistoryComponent } from './purchasehistory/purchasehistory.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
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
    BasicelementsComponent,
    NavigationComponent,
    TypographyComponent,
    NucleoiconsComponent,
    NotificationComponent,
    NgbdModalBasic,
    SigninComponent,
    SellingComponent,
    RatingsComponent,
    PurchasehistoryComponent,
    BookmarksComponent
    //BroadcastComponent
  ],
  exports: [ComponentsComponent]
})
export class ComponentsModule {}
