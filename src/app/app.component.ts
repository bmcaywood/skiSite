import { Component } from '@angular/core';
import { NavButton } from './Components/Common/header.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public buttons: NavButton[] = [{name: 'HOME', isSelected: true}, {name: 'RESORTS', isSelected: false}, {name: 'BLOG', isSelected: false},
  {name: 'LOCAL', isSelected: false}];
}
