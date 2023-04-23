import { Component } from '@angular/core';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.scss']
})
export class DiscussionPageComponent {
  currentClass: string = "ln-list-default";
  currentText: string = "ln-list-option none";

  toggleSubmenu() {
    if (this.currentClass === "ln-list-default") {
      this.currentClass = "ln-list-default show";
      this.currentText = "ln-list-option block";
    } else {
      this.currentClass = "ln-list-default";
      this.currentText = "ln-list-option none";
    }
  }
}
