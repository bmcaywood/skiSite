import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CKEditorComponent} from 'ng2-ckeditor';

@Component({
  selector: 'app-rater',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Output('newRating')
  newRating: EventEmitter<number> = new EventEmitter<number>();
  private ratings: number[] = [.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  public startX: number;
  public divider: number;
  public locked = false;

  public imagesLeft: string[] = [
    '../../assets/images/flakeLeftEmpty.png',
    '../../assets/images/flakeLeftFilled.png'
  ];
  public imagesRight: string[] = [
    '../../assets/images/flakeRightEmpty.png',
    '../../assets/images/flakeRightFilled.png'
  ];

  ngOnInit(): void {
    if (!this.rating || this.rating === 0) {
      this.locked = false;
    }
  }

  public moveMouse(e: any) {
    if (this.locked) {
      return;
    }
    if (!this.startX) {
      this.startX = e.currentTarget.getBoundingClientRect().left;
      this.divider =
          (e.currentTarget.getBoundingClientRect().right - this.startX) / 10;
    }

    const value = (e.pageX - this.startX - 10) / this.divider;

    if (value < 0) {
      this.rating = -1;
    } else {
      this.rating = Math.round(value);
    }
    console.log(this.rating);
  }

  public recordRate() {
    if (isNaN(this.rating) || this.rating < 0) {
      this.newRating.emit(0);
    } else {
      this.newRating.emit(this.ratings[this.rating]);
    }
  }
}
