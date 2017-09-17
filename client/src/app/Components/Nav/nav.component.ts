import { Component, OnChanges, Input} from '@angular/core';
import { NavButton } from './navButton.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnChanges {
  @Input() buttons: NavButton[] = [];
  @Input() loginButton: NavButton = null;
  @Input() user: any = null;
  public isExpanded = false;
  public selected: NavButton = null;

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
    this.loginButton.isSelected = false;
    btn.isSelected = true;
    this.selected = btn;
  }
}
