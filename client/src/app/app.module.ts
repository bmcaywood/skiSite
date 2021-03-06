import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CKEditorModule} from 'ng2-ckeditor';
import {CookieModule} from 'ngx-cookie';
import {PubNubAngular} from 'pubnub-angular2';

import {AppComponent} from './app.component';
import {HomeModule} from './Components/home/home.module';
import {LoginModule} from './Components/login/login.module';
import {NavModule} from './Components/Nav/nav.module';
import {ResortModule} from './Components/resort/resort.module';
import {Mediator} from './service/mediator';
import {UserService} from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    NavModule,
    HomeModule,
    ResortModule,
    CookieModule.forRoot(),
    LoginModule,
    FormsModule,
    CKEditorModule,
  ],
  providers: [PubNubAngular, UserService, Mediator],
  bootstrap: [AppComponent]
})
export class AppModule {}
