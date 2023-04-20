import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() maxRating = 5;
  @Input() selectedStar: number = 0;
  @Output() onRating: EventEmitter<number> = new EventEmitter<number> ();
  maxRatingArr: any = [];
  previousSelection = 0;

  HandleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }

  HandleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection;
    }
    else {
      this.selectedStar = 0;
    }
  }

  rating(index: number) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar;
    this.onRating.emit(this.selectedStar);
  }

  ngOnInit(): void {
    // this.selectedStar = 2;
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }
}
