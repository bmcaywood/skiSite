import { Component, OnChanges, Input} from '@angular/core';
import { NavButton } from './navButton.interface';
import { PubNubAngular } from 'pubnub-angular2';
import pubNubKey from '../../keys/pubNub';
import * as _ from 'lodash';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnChanges {
  @Input() buttons: NavButton[] = [];
  @Input() user: any = null;
  public isExpanded = false;
  public selected: NavButton = null;

  private pubnub: PubNubAngular = new PubNubAngular();
  
  constructor() {
    this.pubnub.init(pubNubKey);
  }

  public ngOnChanges(changes: any) {
    if (changes.buttons) {
      this.buttons.forEach(btn => {
        if (btn.isSelected) {
          this.selected = btn;
        }
      });
    }
  }

  public selectButton(btn: NavButton) {
    if (btn.isDisabled) {
      return;
    }

    this.buttons.forEach(b => { b.isSelected = false; });
    btn.isSelected = true;
    this.selected = btn;
  }

  public login() {
    this.pubnub.publish(
      {channel: 'login',
      message: { name: 'test', pass: 'pass' }}, (response) =>{
        console.log(response);
    });
  }
}
