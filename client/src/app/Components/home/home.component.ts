import {Component, Input, OnChanges} from '@angular/core';

import {User} from '../../model/user';
import {NavButton} from '../Nav/navButton.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnChanges {
  @Input() user: User = null;
  public sideButtons: NavButton[] = [
    {name: 'POST', isSelected: true}, {name: 'COMMENTS', isSelected: false},
    {name: 'RATING', isSelected: false}
  ];

  public isAdmin = false;

  public ngOnChanges(changes: any) {
    if (changes.user) {
      if (this.user) {
        // tslint:disable-next-line:no-bitwise
        this.isAdmin = (this.user.priv & 4) > 0;
      }
    }
  }
}
