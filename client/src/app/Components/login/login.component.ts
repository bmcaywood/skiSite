import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import * as _ from 'lodash';
import {CookieService} from 'ngx-cookie';
import {PubNubAngular} from 'pubnub-angular2';
import * as io from 'socket.io-client';

import {clientRequests, serverResponse} from '../../constants/server.keys';
import {User} from '../../model/user';
import {Mediator} from '../../service/mediator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  @Output('loggedIn')
  loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  public passConfirm = '';
  public register = false;
  public canSubmit = false;
  public user: User = new User();
  public loginErr;
  public registerErr;

  private pubnub: PubNubAngular = new PubNubAngular();

  constructor(
      private cookieService: CookieService, private mediator: Mediator) {}

  ngOnInit() {
    this.mediator.subscribe(serverResponse.USERLOGGEDIN, (user) => {
      if (user.error) {
        this.loginErr = user.error;
      } else {
        this.cookieService.putObject('user', user);
        this.loginErr = null;
        this.loggedIn.emit(true);
      }
    });
    this.mediator.subscribe(serverResponse.USERREGISTERED, (user) => {
      if (user.error) {
        this.registerErr = user.error;
      } else {
        this.cookieService.putObject('user', user);
        this.loggedIn.emit(true);
        this.registerErr = null;
      }
    });

    this.loggedIn.emit(false);
  }

  ngOnDestroy(): void {
    this.mediator.unsubscribe(serverResponse.USERLOGGEDIN, (user) => {});
    this.mediator.unsubscribe(serverResponse.USERREGISTERD, (user) => {});
  }

  public enableSubmit() {
    if (this.register) {
      this.canSubmit = this.user.name && this.user.username &&
          this.user.email && this.user.pass &&
          _.isEqual(this.user.pass, this.passConfirm);
    } else {
      this.canSubmit = this.user.username && this.user.pass && true;
    }
  }


  public login() {
    this.enableSubmit();
    if (this.canSubmit) {
      this.mediator.publish(clientRequests.USERLOGIN, this.user);
    }
  }

  public newUser() {
    this.enableSubmit();
    if (this.canSubmit) {
      this.mediator.publish(clientRequests.USERREGISTER, this.user);
    }
  }
}
