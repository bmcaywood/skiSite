import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {CookieService} from 'ngx-cookie';

import {NavButton} from './navButton.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnChanges, OnInit {
  @Input() buttons: NavButton[] = [];
  @Input() loginButton: NavButton = null;
  @Input() user: any = null;
  @Output('logOut')
  logOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isExpanded = false;
  public selected: NavButton = null;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    const selected = this.cookieService.getObject('nav') as NavButton;
    if (selected) {
      const index = _.findIndex(this.buttons, (b) => {
        return _.isEqual(b.name, selected.name);
      });
      if (index > -1) {
        this.selectButton(this.buttons[index]);
      }
    }
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

    this.buttons.forEach(b => {
      b.isSelected = false;
    });
    this.loginButton.isSelected = false;
    btn.isSelected = true;
    this.selected = btn;
    this.cookieService.putObject('nav', this.selected);
  }

  public logout() {
    this.cookieService.removeAll();
    this.logOut.emit(true);
  }
}
