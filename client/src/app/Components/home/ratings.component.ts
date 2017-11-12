import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import {ratingType} from '../../constants/common';
import {clientRequests, serverResponse} from '../../constants/server.keys';
import {Rating, UserRatings} from '../../model/rating';
import {Resort} from '../../model/resort';
import {User} from '../../model/user';
import {Mediator} from '../../service/mediator';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  @Input() user: User;
  public userRatings: UserRatings[] = [];

  public canSubmit = false;
  public title = '';
  public rating: UserRatings = new UserRatings();
  public resorts: Resort[] = null;
  public locked = false;

  constructor(private modalService: NgbModal, private mediator: Mediator) {}

  ngOnInit() {
    this.mediator.subscribe(serverResponse.RESORTS, (resorts) => {
      if (resorts.error) {
        console.log(resorts.error);
      } else {
        this.resorts = resorts;
      }
    });

    this.mediator.subscribe(serverResponse.RATINGSBYUSER, (r) => {
      if (r.error) {
        console.log(r.error);
      } else {
        this.userRatings = _.transform(r.ratings, (a, rate) => {
          const rating: UserRatings = new UserRatings();
          rating.copyInto(rate, this.resorts);
          a.push(rating);
        });
        console.log(this.userRatings);
      }
    });

    this.mediator.subscribe(serverResponse.NEWRATING, (rating) => {
      if (rating.error) {
        console.log(rating.error);
      } else {
        const newRating = new UserRatings();
        newRating.copyInto(rating, this.resorts);
        if (newRating.userId === +this.user.id) {
          this.userRatings.push(newRating);
        }
      }
    });

    this.mediator.subscribe(serverResponse.UPDATEDRATING, (rating) => {
      if (rating.error) {
        console.log(rating.error);
      } else {
        const newRating = new UserRatings();
        newRating.copyInto(rating, this.resorts);
        if (newRating.userId === this.user.id) {
          const index = _.findIndex(this.userRatings, p => {
            return +p.id === newRating.id;
          });
          if (index > -1) {
            this.userRatings[index] = newRating;
          }
        }
      }
    });

    this.mediator.subscribe(serverResponse.REMOVEDRATING, (ratingId) => {
      if (ratingId.error) {
        console.log(ratingId.error);
      } else {
        const index = _.findIndex(this.userRatings, p => {
          return +p.id === +ratingId.id;
        });
        if (index > -1) {
          this.userRatings.splice(index, 1);
        }
      }
    });

    this.mediator.request(clientRequests.GETRESORTS);
    this.mediator.request(clientRequests.GETRATINGSBYUSER, this.user.id);
  }


  public openRateModal(content) {
    this.canSubmit = false;
    this.rating = new UserRatings();
    this.rating.userId = this.user.id;
    this.title = 'Add Rating';
    this.locked = false;
    this.enableSubmit();
    this.modalService.open(content, {windowClass: 'wide-modal'})
        .result
        .then(
            (result) => {
              console.log(result);
            },
            (reason) => {
              console.log(this.getDismissReason(reason));
            })
        .catch(console.log.bind(console));
  }

  public edit(content, rating: UserRatings) {
    this.rating = _.cloneDeep(rating);
    this.rating.userId = this.user.id;
    this.rating.resort = rating.resort;
    this.title = 'Edit Rating';
    this.locked = true;
    this.enableSubmit();
    this.modalService.open(content)
        .result
        .then(
            (result) => {
              console.log(result);
            },
            (reason) => {
              console.log(this.getDismissReason(reason));
            })
        .catch(console.log.bind(console));
  }

  public enableSubmit() {
    this.canSubmit = this.rating.resort && this.rating.ratings &&
        this.rating.ratings[1].rating > 0 &&
        this.rating.ratings[2].rating > 0 &&
        this.rating.ratings[3].rating > 0 &&
        this.rating.ratings[4].rating > 0 &&
        this.rating.ratings[5].rating > 0 && this.rating.ratings[6].rating > 0;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public saveRating(c: any) {
    if (this.canSubmit) {
      c('saveClicked');
      this.mediator.publish(clientRequests.ADDRATING, this.rating);
    }
  }

  public remove(rating: UserRatings) {
    this.mediator.publish(clientRequests.REMOVERATING, rating);
  }
}
