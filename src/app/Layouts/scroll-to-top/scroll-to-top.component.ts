import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {

  constructor() { }

  scrollToTop(){
    window.scroll(0,0);
 }
}
