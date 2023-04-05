import { Component } from '@angular/core';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {
  currentSpan: string = "button button-green js-call-filters-wrapper";
  closeSpan: string = "js-off-filters-wrapper button button-red";
  currentStyle: string = "display: none;";

  changeClass() {
    if (this.currentSpan === "button button-green js-call-filters-wrapper") {
      this.currentStyle = "display: block;";

    } else {
      this.currentStyle = "display: none;";
    }
  }

  buttonClose() {
    if (this.closeSpan === "js-off-filters-wrapper button button-red") {
      this.currentStyle = "display: none;";

    } else {
      this.currentStyle = "display: block;";
    }
  }
}
