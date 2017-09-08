import { Component } from '@angular/core';
import { NavButton } from './Components/Nav/navButton.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public buttons: NavButton[] = [{name: 'HOME', isSelected: true}, {name: 'RESORTS', isSelected: false}, {name: 'BLOG', isSelected: false},
  {name: 'LOCAL', isSelected: false}];

  public sideButtons: NavButton[] = [{name: 'TEST', isSelected: true}, {name: 'THIS', isSelected: false},
  {name: 'WORKS', isSelected: false}, {name: 'COOL', isSelected: false}];
}
