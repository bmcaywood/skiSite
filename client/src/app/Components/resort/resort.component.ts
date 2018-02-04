import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {clientRequests, serverResponse} from '../../constants/server.keys';
import {Resort} from '../../model/resort';
import {User} from '../../model/user';
import {Mediator} from '../../service/mediator';


@Component({
  selector: 'app-resort',
  templateUrl: './resort.component.html',
  styleUrls: ['./resort.component.css']
})
export class ResortComponent implements OnChanges, OnInit {
  @Input() user: User = null;

  public resorts: Resort[] = [];
  public selectedResort: Resort;

  constructor(private modalService: NgbModal, private mediator: Mediator) {}

  ngOnInit() {
    this.mediator.subscribe(serverResponse.RESORTS, (resorts) => {
      if (resorts.error) {
        console.log(resorts.error);
      } else {
        this.resorts = resorts;
      }
    });

    // this.mediator.request(clientRequests.GETRESORTS);
  }

  public ngOnChanges(changes: any) {
    if (changes.user) {
      if (this.user) {
      }
    }
  }

  public openTrailMap(content) {
    this.modalService.open(content)
        .result
        .then(
            (result) => {
              console.log(result);
            },
            (reason) => {
              console.log(reason);
            })
        .catch(console.log.bind(console));
  }
}
