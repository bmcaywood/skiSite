import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CKEditorComponent} from 'ng2-ckeditor';

@Component({
  selector: 'app-rater',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() rating: number;
  @Input() disabled = false;
  @Input() locked = false;
  @Input() small = false;
  @Output('newRating')
  newRating: EventEmitter<number> = new EventEmitter<number>();
  private ratings: number[] = [.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  public startX: number;
  public divider: number;

  public flakes: string[] = [
    '../../assets/images/flakes/snowEmpty.png',
    '../../assets/images/flakes/snowHalf.png',
    '../../assets/images/flakes/snowFull.png'
  ];

  ngOnInit(): void {
    if (!this.rating || this.rating === 0) {
      this.locked = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rating) {
      this.rating = this.ratings.indexOf(changes.rating.currentValue);
    }
  }

  public moveMouse(e: any) {
    if (this.locked || this.disabled) {
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
  }

  public recordRate() {
    if (isNaN(this.rating) || this.rating < 0) {
      this.newRating.emit(0);
    } else {
      this.newRating.emit(this.ratings[this.rating]);
    }
  }
}
