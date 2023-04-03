import { Component } from '@angular/core';

@Component({
  selector: 'app-novel-page',
  templateUrl: './novel-page.component.html',
  styleUrls: ['./novel-page.component.scss']
})
export class NovelPageComponent {
  currentClass: string = "summary-more more-state";
  currentText: string = "Xem thêm";
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
}
