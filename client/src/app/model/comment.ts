import {Moment, utc} from 'moment';

import {Post} from './post';
import {SimpleUser} from './user';

export class Comment {
  public post: Post;
  public user: SimpleUser;
  public comment: string;
  public approved: boolean;
  public date: Moment;
}
