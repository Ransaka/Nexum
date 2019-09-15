import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { AuthGuard } from './Auth/auth.guard';
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
// import { VoteService } from './pages/ratingform/ratingform.component/vote.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CustomerprofileComponent } from './pages/userprofile/customerprofile/customerprofile.component';
import { SellerprofileComponent } from './pages/userprofile/sellerprofile/sellerprofile.component';

import { RatingformComponent } from './pages/ratingform/ratingform.component';

import { AdminprofileComponent } from './pages/userprofile/adminprofile/adminprofile.component';
import { ComplainsComponent } from './pages/complains/complains.component';
import { CustComplainComponent } from './pages/cust-complain/cust-complain.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserprofileComponent,
    BroadcastComponent,
    CustomerprofileComponent,
    SellerprofileComponent,
    RatingformComponent,
    AdminprofileComponent,
    EditprofileComponent,
    ComplainsComponent,
    CustComplainComponent
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

    ReactiveFormsModule,
    // VoteService,

    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
