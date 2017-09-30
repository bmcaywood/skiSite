import {Component, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import * as _ from 'lodash';
import {CookieOptions, CookieService} from 'ngx-cookie';
import {PubNubAngular} from 'pubnub-angular2';

import {NavButton} from './Components/Nav/navButton.interface';
import {User} from './model/user';
import {Mediator} from './service/mediator';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public buttons: NavButton[] = [
    {name: 'HOME', isSelected: true}, {name: 'RESORTS', isSelected: false},
    {name: 'BLOG', isSelected: false}, {name: 'LOCAL', isSelected: false}
  ];

  public loginButton: NavButton = {name: 'LOGIN', isSelected: false};

  public user: User = null;
  public isAdmin = false;

  constructor(
      private cookieService: CookieService, private userService: UserService,
      private mediator: Mediator) {}

  ngOnInit() {
    this.user = this.cookieService.getObject('user') as User;
  }

  public newUser(newUser: boolean) {
    if (newUser) {
      this.user = this.cookieService.getObject('user') as User;
      this.loginButton.isSelected = false;
      this.buttons[0].isSelected = true;
    }
  }
}
