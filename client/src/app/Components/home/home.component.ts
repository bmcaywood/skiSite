import { Component, Input, OnChanges } from '@angular/core';
import { NavButton } from '../Nav/navButton.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnChanges {
  @Input() user: any = null;
  public sideButtons: NavButton[] = [{name: 'POST', isSelected: true}, {name: 'COMMENTS', isSelected: false},
  {name: 'RATING', isSelected: false}];

  public isAdmin = false;


  public ngOnChanges(changes: any) {
    if (changes.user) {
      if(this.user) {
        this.isAdmin = (this.user.priv & 4) > 0;
      }
    }
  }
}
