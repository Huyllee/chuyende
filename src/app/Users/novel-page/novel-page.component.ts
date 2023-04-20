import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { Novel, Categories, novelById, tagById, volumeById, chaptersById, favorites, rating } from 'src/app/Model/novel';
import { User } from 'src/app/Model/users';
import { UserDataService } from 'src/app/Services/user-data.service';
import { NgToastService } from 'ng-angular-popup';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

defineComponents(IgcRatingComponent);

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
  ratings!: rating;
  rating_value!: rating;
  count: number = 0;
  user_id: number = 0;
  novel_id: number = 0;
  id: number = 0;
  rating: number = 0;

  constructor(private novelService: NovelDataService, private userService: UserDataService, private activatedRoute: ActivatedRoute, private toastService: NgToastService,) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

    })

    userService.getUsersByEmail(this.user.email).subscribe((users) => {
      this.users = users;
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

    this.novelService.getRating(this.users[0].user_id, this.id).subscribe(rating => {
      this.rating_value = rating;
      console.log(this.rating_value);
    });

    this.novelService.getFavorites(id).subscribe(favorite => this.count = favorite.length);


  }

  Handle(event: number) {
    this.rating = event;
    this.activatedRoute.params.subscribe(val => {
      this.id = val['id'];
      if (val && val['id']) {
        this.novelService.postRating(this.users[0].user_id, this.id, this.rating).subscribe(ratings => {
          this.ratings = ratings;
          this.toastService.success({ detail: "Success", summary: `Bạn đã đánh giá ${event} sao`, duration: 3000 });
          if (ratings.ok === false) {
            // update
            this.toastService.success({ detail: "Success", summary: `Bạn đã đánh giá ${event} sao`, duration: 3000 });
          }
        })
      }
    })
  }

  onFavorites(): void {
    this.activatedRoute.params.subscribe(val => {
      this.id = val["id"];
      if (val && val["id"]) {
      // const id = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.novelService.postFavorites(this.users[0].user_id, this.id).subscribe(favorites => {
        this.favorites = favorites;
        if (favorites.ok === false) {
          this.toastService.warning({ detail: "Warning", summary: "Truyện đã được theo dõi!", duration: 3000 });
        }

        else {
          this.toastService.success({ detail: "Success", summary: "Bạn đã theo dõi truyện!", duration: 3000 });
        }
      });
      console.log(this.id);
      }
    })
  }



}
