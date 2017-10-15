import {Resort} from './resort';

export class Rating {
  public rating: number;
  public ratingReason: string;
}

export class UserRatings {
  public userId: number;
  public resort: Resort;
  public ratings: Map<number, Rating>;
}
