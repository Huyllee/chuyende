import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { Novel, chaptersById, volumeById } from 'src/app/Model/novel';
import { volumes } from 'src/app/Model/novel';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
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

  novels: Novel[] = [];
  topNovels: Novel[] = [];
  newNovel: Novel[] = [];
  volumes: volumes[] = [];
  chapters: chaptersById[] = [];

  constructor(private novelService: NovelDataService) {}

  ngOnInit(): void {
    this.novelService.getNovels().subscribe(novels => this.novels = novels);

    this.novelService.getTopRatings().subscribe(res => {
      this.topNovels = res;
    });

    this.novelService.getNewChapters().subscribe(chapters => {
      this.chapters = chapters;
    });

    this.novelService.getAllNovels().subscribe(res => {
      this.newNovel = res;
      this.newNovel.sort((a, b) => {
        if (a.updated_at && b.updated_at) {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        } else {
          return 0;
        }
      });
      console.log(this.newNovel);
    })


  }

}
