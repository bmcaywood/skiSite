import { Component, OnInit } from '@angular/core';
import { NavButton } from './Components/Nav/navButton.interface';
import { PubNubAngular } from 'pubnub-angular2';
import { CookieService, CookieOptions } from 'ngx-cookie';
import pubNubKey from './keys/pubNub';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public buttons: NavButton[] = [{name: 'HOME', isSelected: true}, {name: 'RESORTS', isSelected: false}, {name: 'BLOG', isSelected: false},
  {name: 'LOCAL', isSelected: false}];

  public loginButton: NavButton = {name: 'LOGIN', isSelected: false};
  public loginErr: string = null;

  public user: any = null;
  public isAdmin: boolean = false;

  private pubnub: PubNubAngular = new PubNubAngular();

  constructor(private cookieService: CookieService) {
    this.pubnub.init(pubNubKey);
  }

  // public play() {
  //   console.log('here');
  // }

  ngOnInit() {
    this.pubnub.subscribe({ channels: ['anotherTest', 'userLogin', 'userRegistered'], triggerEvents: true, withPresence: true });
    // this.pubnub.addListener({
    //   status: (se)  => {
    //     if(_.isEqual(se.category, 'PNConnectedCategory')) {
    //       this.play();
    //     } else if (_.isEqual(se.category, 'PNUnknownCategory')) {
    //       const newState = { new: 'error' };
    //       this.pubnub.setState( { state: newState },
    //       (st) => {
    //         console.log(se.errorData.message);
    //       });
    //     }
    //   },
    //   message: (message) => {
    //     console.log(message);
    //   }
    // });
    this.pubnub.getMessage('anotherTest', (message) => {
      console.log(message);
    });

    this.pubnub.getMessage('userLogin', (m) => {
      if(m.message.error) {
        console.log('error getting user: ' + m.message.error);
        this.loginErr = m.message.error;
      } else {
      this.user = m.message;
      this.cookieService.putObject('user', this.user);
      console.log(m);  
      }    
    });

    this.pubnub.getMessage('userRegistered', (m) => {
      if(m.message.error) {
        console.log('error getting user: ' + m.message.error);
        this.loginErr = m.message.error;
      } else {
        //TODO SUBSCRIBE TO NEW CHANNEL WITH UUID
      this.user = m.message;
      this.cookieService.putObject('user', this.user);
      console.log(m);  
      }    
    });

    this.user = this.cookieService.getObject('user');    
  }

  public testButton() {
    this.pubnub.publish(
      {channel: 'response',
      message: { gotIt: 'okidokie', id: 'test' }}, (response) =>{
        console.log(response);
    });
  }
}
