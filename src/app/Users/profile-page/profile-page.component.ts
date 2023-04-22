import { Component, OnInit } from '@angular/core';
import { Novel, favorites } from 'src/app/Model/novel';
import { User } from 'src/app/Model/users';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { UserDataService } from 'src/app/Services/user-data.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user!: User;
  users!: User;
  favorites!: Novel[];
  novels!: Novel[];
  count!: number;

  constructor(private userService: UserDataService, private novelService: NovelDataService, private confrm: NgConfirmService, private toast: NgToastService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

    userService.getUsersByEmail(this.user.email).subscribe(res => {
      this.users = res;
      console.log(this.users);
    })

  }

  ngOnInit() {
    this.getFavorites();
    console.log(this.getFavorites());
  }

  getFavorites() {
    this.novelService.getFavoriteById(this.user.user_id).subscribe(res => {
      this.favorites = res;
      this.count = res.length;
      console.log(this.favorites[0].novel_id);
    })
  }

  delete(favories_id: number) {
    this.confrm.showConfirm(("Bạn có muốn xóa không ?"),

    () => {
      this.novelService.deleteFavorites(favories_id).subscribe(res=> {
        if (res.ok === true) {
          this.toast.success({ detail: "Success", summary: "Đã xóa khỏi danh sách yêu thích!", duration: 3000 });
          this.getFavorites();
        } else {
          console.log("Unknown response from server: ", res);
        }
      });
    },
    () => {}
  );

  }

}
