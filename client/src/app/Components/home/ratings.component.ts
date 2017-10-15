import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import {ratingType} from '../../constants/common';
import {clientRequests, serverResponse} from '../../constants/server.keys';
import {Rating, UserRatings} from '../../model/rating';
import {User} from '../../model/user';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent {
  @Input() user: User;
  public userRatings: UserRatings[] = [];
}
