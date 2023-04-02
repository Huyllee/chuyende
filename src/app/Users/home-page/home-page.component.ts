import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  dynamicSlides = [
    {
      id: 1,
      src:'https://via.placeholder.com/600/92c952',
      alt:'Side 1',
      title:'Side 1'
    },
    {
      id: 2,
      src:'https://via.placeholder.com/600/771796',
      alt:'Side 2',
      title:'Side 2'
    },
    {
      id: 3,
      src:'https://via.placeholder.com/600/24f355',
      alt:'Side 3',
      title:'Side 3'
    },
    {
      id: 4,
      src:'https://via.placeholder.com/600/d32776',
      alt:'Side 4',
      title:'Side 4'
    },
    {
      id: 5,
      src:'https://via.placeholder.com/600/f66b97',
      alt:'Side 5',
      title:'Side 5'
    }
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    autoplayTimeout: 2000,
    margin: 20,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 2
      },
      500: {
        items: 3
      },
      680: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    autoplayTimeout: 2000,
    margin: 20,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 2
      },
      490: {
        items: 4
      },
      700: {
        items: 6
      },
      940: {
        items: 8
      }
    },
    nav: false
  }
}
