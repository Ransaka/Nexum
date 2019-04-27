import { ComponentsModule } from './components/components.module';
import { ProfilesModule } from './profiles/profiles.module';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { CustprofileComponent } from './profiles/custprofile/custprofile.component';
import { SellerprofileComponent } from './profiles/sellerprofile/sellerprofile.component';
import { SigninComponent } from './components/signin/signin.component';


const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'profiles/custprofile',     component: CustprofileComponent },
    { path: 'profiles/sellerprofile',     component: SellerprofileComponent },
    { path: 'components/signin',     component: SigninComponent }
    
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        ProfilesModule,
        ComponentsModule
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
