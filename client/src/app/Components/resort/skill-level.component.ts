import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import {CookieService} from 'ngx-cookie';

import {User} from '../../model/user';
import {Mediator} from '../../service/mediator';
import {NavButton} from '../helpers/navButton';

@Component({
  selector: 'app-skill-level',
  templateUrl: './skill-level.component.html',
  styleUrls: ['./skill-level.component.css']
})
export class SkillLevelComponent implements OnChanges, OnInit {
  @Input() user: User = null;

  public buttons: NavButton[] = [
    {name: 'greenCircle', isSelected: false},
    {name: 'blueSquare', isSelected: false}, {name: 'black', isSelected: false},
    {name: 'doubleBlack', isSelected: false},
    {name: 'park', isSelected: false}
  ];

  public selected: NavButton;

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

  public ngOnChanges(changes: any) {}

  public selectButton(btn: NavButton) {
    if (!btn || btn.isDisabled) {
      return;
    }

    this.buttons.forEach(b => {
      b.isSelected = false;
    });
    btn.isSelected = true;
    this.selected = btn;
    this.cookieService.putObject('skillLevel', this.selected);
  }
}
