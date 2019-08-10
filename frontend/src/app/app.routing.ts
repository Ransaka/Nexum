import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { AuthGuard } from './Auth/auth.guard';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ComponentsComponent },
  {
    path: 'userprofile',
    component: UserprofileComponent,
    canActivate: []
  },
  { path: 'userprofile/broadcast', component: BroadcastComponent }
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
