import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PubNubAngular } from 'pubnub-angular2';
import { AppComponent } from './app.component';
import { NavModule } from './Components/Nav/nav.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './Components/home/home.module';
import { CookieModule } from 'ngx-cookie';
import { LoginModule } from './Components/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    NavModule,
    HomeModule,
    CookieModule.forRoot(),
    LoginModule,
    FormsModule
  ],
  providers: [
    PubNubAngular,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
