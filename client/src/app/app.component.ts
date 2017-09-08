import { Component, OnInit } from '@angular/core';
import { NavButton } from './Components/Nav/navButton.interface';
import { PubNubAngular } from 'pubnub-angular2';
import * as _ from 'lodash';
import pubNubKey from './keys/pubNub';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public buttons: NavButton[] = [{name: 'HOME', isSelected: true}, {name: 'RESORTS', isSelected: false}, {name: 'BLOG', isSelected: false},
  {name: 'LOCAL', isSelected: false}];

  public sideButtons: NavButton[] = [{name: 'TEST', isSelected: true}, {name: 'THIS', isSelected: false},
  {name: 'WORKS', isSelected: false}, {name: 'COOL', isSelected: false}];

  private pubnub: PubNubAngular = new PubNubAngular();

  constructor() {
    this.pubnub.init(pubNubKey);
  }

  // public play() {
  //   console.log('here');
  // }

  ngOnInit() {
    this.pubnub.subscribe({ channels: ['anotherTest'], triggerEvents: true, withPresence: true });
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
  }

  public testButton() {
    this.pubnub.publish(
      {channel: 'response',
      message: { gotIt: 'okidokie', id: 'test' }}, (response) =>{
        console.log(response);
    });
  }
}
