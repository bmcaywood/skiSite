import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {CookieService} from 'ngx-cookie';

import {NavButton} from './navButton.interface';

@Component({
  selector: 'app-side-nav',
  templateUrl: './sideNav.component.html',
  styleUrls: ['./sideNav.component.css']
})

export class SideNavComponent implements OnChanges, OnInit {
  @Input() buttons: NavButton[] = [];
  public isExpanded = false;
  public selected: NavButton = null;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    const selected = this.cookieService.getObject('sideNav') as NavButton;
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
    if (!btn || btn.isDisabled) {
      return;
    }

    this.buttons.forEach(b => {
      b.isSelected = false;
    });
    btn.isSelected = true;
    this.selected = btn;
    this.cookieService.putObject('sideNav', this.selected);
  }
}
