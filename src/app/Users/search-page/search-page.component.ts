import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Novel, chaptersById, volumes } from 'src/app/Model/novel';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  novels: Novel[] = [];
  volumes: volumes[] = [];
  chapters: chaptersById[] = [];
  searchTerm = '';

  constructor(private novelService: NovelDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    let novelsObservalbe: Observable<Novel[]>;
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm'] && params) {
        this.searchTerm = params['searchTerm'];
        novelsObservalbe = this.novelService.getAllNovelsBySearchTerm(params['searchTerm']);
        console.log('run');
      }

      else {
        novelsObservalbe = this.novelService.getNovels();
      }

      novelsObservalbe.subscribe((novels) => {
        this.novels = novels;
      })
    });

    novelService.getVolumes().subscribe(volumes => this.volumes = volumes);
    novelService.getChaptersByVolumeId().subscribe(chapters => this.chapters = chapters);
  }

  search(term: string): void {
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }

    else {
      this.router.navigateByUrl('/search/');
    }

  }
}
