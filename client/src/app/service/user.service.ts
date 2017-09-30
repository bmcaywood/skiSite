import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import * as io from 'socket.io-client';

import {User} from '../model/user';

import {Mediator} from './mediator';

@Injectable()
export class UserService {
  private socket;
  private url = 'http://localhost:8000';

  constructor(
      private cookieService: CookieService, private mediator: Mediator) {}
}
