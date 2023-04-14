import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { Novel, Categories, novelById, tagById, volumeById, chaptersById, favorites } from 'src/app/Model/novel';
import { User } from 'src/app/Model/users';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-novel-page',
  templateUrl: './novel-page.component.html',
  styleUrls: ['./novel-page.component.scss']
})
export class NovelPageComponent {
  currentClass: string = "summary-more more-state";
  currentText: string = "Xem thêm";
  currentIcon: string = "fa fa-chevron-down";
  currentSpan: string = "mobile-icon";
  currentStyle: string = "";
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

  mobileIcon() {
    if (this.currentSpan === "mobile-icon") {
      this.currentSpan = "mobile-icon show";
      this.currentIcon = "fa fa-chevron-up";
      this.currentStyle = "display: none;";

    } else {
      this.currentSpan = "mobile-icon";
      this.currentIcon = "fa fa-chevron-down";
      this.currentStyle = "";
    }
  }

  novels: novelById[] = [];
  categories: tagById[] = [];
  volumes: volumeById[] = [];
  chapters: chaptersById[] = [];
  user!: User;
  users!: User[];
  favorites!: favorites;
  user_id: number = 0;
  novel_id: number = 0;

  constructor(private novelService: NovelDataService, private userService: UserDataService, private activatedRoute: ActivatedRoute) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

    })

    userService.getUsersByEmail(this.user.email).subscribe((users) => {
      // console.log(this.user.email);
      this.users = users;
      // console.log(this.users[0].user_id);
    })

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.novelService.getNovelById(id).subscribe(novels => {
      this.novels = novels;
    });

    this.novelService.getTagById(id).subscribe(categories => {
      this.categories = categories;
    });

    this.novelService.getVolumeById(id).subscribe(volumes => {
      this.volumes = volumes;
    });

    this.novelService.getChaptersByVolumeId().subscribe(chapters => {
      this.chapters = chapters;
    });

  }

  onFavorites(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.novelService.postFavorites(this.users[0].user_id, id).subscribe(favorites => {
      this.favorites = favorites;
      alert('Đã thêm truyện vào danh sách yêu thích!');
    });
  }

}
