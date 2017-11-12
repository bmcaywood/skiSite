import * as _ from 'lodash';

import {Resort} from './resort';

export class Rating {
  public rating: number;
  public ratingReason: string;
}

export class UserRatings {
  public id: number;
  public userId: number;
  public resort: Resort;
  public ratings: Map<number, Rating> = new Map<number, Rating>();

  constructor() {
    this.ratings[1] = new Rating();
    this.ratings[2] = new Rating();
    this.ratings[3] = new Rating();
    this.ratings[4] = new Rating();
    this.ratings[5] = new Rating();
    this.ratings[6] = new Rating();
  }

  public copyInto(rating: any, resorts: Resort[]) {
    if (rating.id) {
      this.id = +rating.id;
    }
    this.userId = +rating.userId;
    this.resort = new Resort();
    const index = _.findIndex(resorts, (r) => {
      return r.id === rating.resortId;
    });
    if (index > -1) {
      this.assignResort(resorts[index]);
    }

    Object.keys(rating.ratings).forEach((key) => {
      this.ratings[key] = rating.ratings[key];
    });
  }

  public assignResort(resort: Resort) {
    this.resort = new Resort();
    this.resort.id = resort.id;
    this.resort.name = resort.name;
  }
}
