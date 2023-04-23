import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categories, Novel } from 'src/app/Model/novel';
import { NovelDataService } from 'src/app/Services/novel-data.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {

  currentStyle: string = "display: none;";
  currentSpan: string = "button button-green js-call-filters-wrapper";

  changeClass() {
    if (this.currentSpan === "button button-green js-call-filters-wrapper") {
      this.currentStyle = "display: block;";

    } else {
      this.currentStyle = "display: none;";
    }
  }

  closeSpan: string = "js-off-filters-wrapper button button-red";

  buttonClose() {
    if (this.closeSpan === "js-off-filters-wrapper button button-red") {
      this.currentStyle = "display: none;";

    } else {
      this.currentStyle = "display: block;";
    }
  }

  categories: Categories[] = [];

  novels: Novel[] = [];

  constructor(private categoryService: NovelDataService, private activatedRoute: ActivatedRoute, private route: Router) {

    this.categoryService.getCategories().subscribe(categories => this.categories = categories);

    let novelsObservalbe: Observable<Novel[]>;
    activatedRoute.params.subscribe((params) => {
      if ((params && params['genre'])) {
        novelsObservalbe = this.categoryService.getNovelByCategories(params['genre'])
      }

      else {
        novelsObservalbe = this.categoryService.getNovels();
      }

      novelsObservalbe.subscribe((novels) => {
        this.novels = novels;
        console.log(novels[0].artist);

      })
  });
}

  // ngOnInit(): void {
  //   const genre = this.activatedRoute.snapshot.paramMap.get('genre');
  //   if (genre) {
  //     // this.route.navigate(['/category/'+ genre]);
  //     this.categoryService.getNovelByCategories(genre).subscribe(novels => this.novels = novels);
  //     console.log(this.route.navigate(['/category/'+ genre]));
  //   }
  //   else {
  //     this.categoryService.getNovels().subscribe(novels => this.novels = novels);
  //   }
  //   console.log(genre);
  // }

}
