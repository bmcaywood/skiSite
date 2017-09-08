import { Component, OnChanges, Input} from '@angular/core';
import { NavButton } from './navButton.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-side-nav',
  templateUrl: './sideNav.component.html',
  styleUrls: ['./sideNav.component.css']
})

export class SideNavComponent implements OnChanges {
  @Input() buttons: NavButton[] = [];
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
    btn.isSelected = true;
    this.selected = btn;
  }
}
