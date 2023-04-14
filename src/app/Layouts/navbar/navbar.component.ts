import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;
  }
}
