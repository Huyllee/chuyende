import { Component } from '@angular/core';

@Component({
  selector: 'app-novel-page',
  templateUrl: './novel-page.component.html',
  styleUrls: ['./novel-page.component.scss']
})
export class NovelPageComponent {
  currentClass: string = "summary-more more-state";
  currentText: string = "Xem thêm";
  currentIcon: string = "fa fa-chevron-down";
  currentSpan: string = "mobile-icon";
  currentStyle: string = "";
  isChecked: boolean = false;

  changeClass() {
    if (this.currentClass === "summary-more more-state") {
      this.currentClass = "summary-more less-state";
      this.currentText = "Ẩn đi";
    } else {
      this.currentClass = "summary-more more-state";
      this.currentText = "Xem thêm";
    }
  }

  mobileIcon() {
    if (this.currentSpan === "mobile-icon") {
      this.currentSpan = "mobile-icon show";
      this.currentIcon = "fa fa-chevron-up";
      this.currentStyle = "display: none;";

    } else {
      this.currentSpan = "mobile-icon";
      this.currentIcon = "fa fa-chevron-down";
      this.currentStyle = "";
    }
  }
}
