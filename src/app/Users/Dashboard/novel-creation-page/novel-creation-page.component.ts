import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-novel-creation-page',
  templateUrl: './novel-creation-page.component.html',
  styleUrls: ['./novel-creation-page.component.scss']
})
export class NovelCreationPageComponent {

  currentClass: string = "nav-has-submenu";
  activeClass: string = "nav-submenu list-unstyled none";

  btnClass: string = "none-xl";
  btnActive: string = "navbar-menu none hidden-block at-mobile unstyle";

  changeClass() {
    if (this.currentClass === "nav-has-submenu") {
      this.currentClass = "nav-has-submenu active";
      this.activeClass = "nav-submenu list-unstyled";
    } else {
      this.currentClass = "nav-has-submenu";
      this.activeClass = "nav-submenu list-unstyled none";
    }
  }

  btnDrop() {
    if (this.btnClass === "none-xl") {
      this.btnClass = "none-xl active";
      this.btnActive = "navbar-menu hidden-block at-mobile unstyle";

      if (this.currentClass === "nav-has-submenu") {
        this.currentClass = "nav-has-submenu active";
        this.activeClass = "nav-submenu list-unstyled";
      } else {
        this.currentClass = "nav-has-submenu";
        this.activeClass = "nav-submenu list-unstyled none";
      }
    } else {
      this.btnClass = "none-xl";
      this.btnActive = "navbar-menu none hidden-block at-mobile unstyle";
    }
  }

  isSubMenuVisible = false;

  toggleMenu() {
    const navbarMenu = document.querySelector('.navbar-menu');
    if (navbarMenu) {
      this.isSubMenuVisible = true;
      navbarMenu.classList.toggle('none');
    }
  }

  toggleSubMenu() {
    if (this.isSubMenuVisible) {
      const navSubMenu = document.querySelector('.nav-submenu');
      if (navSubMenu) {
        navSubMenu.classList.toggle('none');
      }
    }

  }


}
