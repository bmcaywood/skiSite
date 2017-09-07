import { Component, OnChanges, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';

export interface NavButton {
  name: string;
  isSelected: boolean;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnChanges {
  @Input() buttons: NavButton[] = [];
  public isExpanded = false;

  public ngOnChanges(changes: any) {
    if (changes.buttons) {

    }
  }

  public selectButton(newButton: NavButton) {
    this.buttons.forEach(btn => {
      btn.isSelected = false;
      if (_.isEqual(btn, newButton)) {
        btn.isSelected = true;
      }
    });
  }


}

