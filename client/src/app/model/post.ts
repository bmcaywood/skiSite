import * as _ from 'lodash';
import {Moment, utc} from 'moment';

import {Resort} from './resort';

export class Post {
  public id: number;
  public userId: number;
  public resort: Resort;
  public title: string;
  public text: string;
  public timeStamp: Moment;

  public setPosts(posts: any[], resorts: Resort[]): Post[] {
    return _.transform(posts, (res, post) => {
      const p: Post = new Post();
      p.id = post.id;
      p.userId = post.user_id;
      const index = _.findIndex(resorts, (r) => {
        return r.id === post.resort_id;
      });
      if (index > -1) {
        p.assignResort(resorts[index]);
      }
      p.title = post.title;
      p.text = post.text;
      p.timeStamp = utc(post.time_stamp);
      res.push(p);
    });
  }

  public copyInto(post: any, resorts: Resort[]) {
    this.userId = post.user_id;
    this.resort = new Resort();
    const index = _.findIndex(resorts, (r) => {
      return r.id === post.resort_id;
    });
    if (index > -1) {
      this.assignResort(resorts[index]);
    }
    this.title = post.title;
    this.text = post.text;
    this.timeStamp = utc(post.time_stamp);
  }

  public assignResort(resort: Resort) {
    this.resort = new Resort();
    this.resort.id = resort.id;
    this.resort.name = resort.name;
  }
}
