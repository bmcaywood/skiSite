import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PubNubAngular } from 'pubnub-angular2';
import pubNubKey from '../../keys/pubNub';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() loginErr: string;
  public name: string = '';
  public username: string = '';
  public email: string = '';
  public pass: string = '';
  public passConfirm: string = '';
  public register: boolean = false;
  public canSubmit: boolean = false;

  private pubnub: PubNubAngular = new PubNubAngular();
    
  constructor() {
    this.pubnub.init(pubNubKey);
  }

  public enableSubmit() {
    if (this.register) {
      this.canSubmit = this.name && this.username && this.email && this.pass && _.isEqual(this.pass, this.passConfirm);
    } else {
      this.canSubmit = this.username && this.pass && true;
    }
  }
  

  public login() {
    this.enableSubmit();
    if(this.canSubmit) {
      this.pubnub.publish(
        {channel: 'login',
        message: { username: this.username, pass: this.pass }}, (response) =>{
          console.log(response);
      });
    }
  }

  public newUser() {
    this.enableSubmit();
    if(this.canSubmit) {
      this.pubnub.publish(
        {channel: 'userRegister',
        message: { name: this.name, username: this.username, email: this.email, pass: this.pass }}, (response) =>{
          console.log(response);
      });
    }
  }

}
