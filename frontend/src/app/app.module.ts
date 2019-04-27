import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClient } from 'selenium-webdriver/http';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
        
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
        
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
