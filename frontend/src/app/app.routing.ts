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
  { path: 'userprofile/admin', component: AdminprofileComponent }
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
