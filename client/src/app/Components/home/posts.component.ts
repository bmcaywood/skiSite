import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {clientRequests, serverResponse} from '../../constants/server.keys';
import {Post} from '../../model/post';
import {Resort} from '../../model/resort';
import {User} from '../../model/user';
import {Mediator} from '../../service/mediator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() user: User;
  public posts: Post[] = [];
  public post: Post = null;
  public resort: Resort = null;
  public resorts: Resort[] = null;

  constructor(private modalService: NgbModal, private mediator: Mediator) {}

  ngOnInit() {
    this.mediator.subscribe(serverResponse.RESORTS, (resorts) => {
      if (resorts.error) {
        console.log(resorts.error);
      } else {
        this.resorts = resorts;
      }
    });
    this.mediator.subscribe(serverResponse.POSTS, (posts) => {
      if (posts.error) {
        console.log(posts.error);
      } else {
        this.posts = posts;
      }
    });

    this.mediator.request(clientRequests.GETRESORTS);
    this.mediator.request(clientRequests.GETPOSTSBYUSER, this.user.id);
  }

  public openPostModal(content) {
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
}
