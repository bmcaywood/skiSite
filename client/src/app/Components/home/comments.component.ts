import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import {ratingType} from '../../constants/common';
import {clientRequests, serverResponse} from '../../constants/server.keys';
import {Comment} from '../../model/comment';
import {User} from '../../model/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() user: User;
  public comments: Comment[] = [];
}
