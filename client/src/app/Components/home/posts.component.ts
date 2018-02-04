import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

import {clientRequests, serverResponse} from '../../constants/server.keys';
import {Post} from '../../model/post';
import {Resort} from '../../model/resort';
import {User} from '../../model/user';
import {Mediator} from '../../service/mediator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() user: User;
  public posts: Post[] = [];
  public post: Post = new Post();
  public resort: Resort = null;
  public resorts: Resort[] = null;
  public canSubmit = false;
  public title = '';

  public selectedResort: Resort = null;

  constructor(private modalService: NgbModal, private mediator: Mediator) {}

  ngOnInit() {
    this.mediator.subscribe(serverResponse.RESORTS, (resorts) => {
      if (resorts.error) {
        console.log(resorts.error);
      } else {
        this.resorts = resorts;
      }
    });
    this.mediator.subscribe(serverResponse.POSTSBYUSER, (posts) => {
      if (posts.error) {
        console.log(posts.error);
      } else {
        this.posts = this.post.setPosts(posts, this.resorts);
      }
    });

    this.mediator.subscribe(serverResponse.NEWPOST, (post) => {
      if (post.error) {
        console.log(post.error);
      } else {
        const newPost = new Post();
        newPost.copyInto(post, this.resorts);
        if (newPost.userId === this.user.id) {
          this.posts.push(newPost);
        }
      }
    });

    this.mediator.subscribe(serverResponse.UPDATEDPOST, (post) => {
      if (post.error) {
        console.log(post.error);
      } else {
        const newPost = new Post();
        newPost.copyInto(post, this.resorts);
        if (newPost.userId === this.user.id) {
          const index = _.findIndex(this.posts, p => {
            return +p.id === newPost.id;
          });
          if (index > -1) {
            this.posts[index] = newPost;
          }
        }
      }
    });

    this.mediator.subscribe(serverResponse.REMOVEDPOST, (postId) => {
      if (postId.error) {
        console.log(postId.error);
      } else {
        const index = _.findIndex(this.posts, p => {
          return +p.id === +postId.id;
        });
        if (index > -1) {
          this.posts.splice(index, 1);
        }
      }
    });

    // this.mediator.request(clientRequests.GETRESORTS);
    this.mediator.request(clientRequests.GETPOSTSBYUSER, this.user.id);
  }

  public openPostModal(content) {
    this.canSubmit = false;
    this.post = new Post();
    this.post.userId = this.user.id;
    this.title = 'Add Post';
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

  public enableSubmit() {
    this.canSubmit =
        this.post.resort && this.post.title && this.post.text !== undefined;
  }

  public savePost(c: any) {
    if (this.canSubmit) {
      c('saveClicked');
      this.mediator.publish(clientRequests.ADDPOST, this.post);
    }
  }

  public remove(post: Post) {
    this.mediator.publish(clientRequests.REMOVEPOST, post.id);
  }

  public edit(content, post: Post) {
    this.post = _.cloneDeep(post);
    this.post.userId = this.user.id;
    this.post.resort = post.resort;
    this.title = 'Edit ' + post.title;
    this.enableSubmit();
    this.modalService.open(content).result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log(this.getDismissReason(reason));
        });
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

  public newContent(content: string) {
    this.post.text = content;
  }
}
