import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Novel } from 'src/app/Model/novel';
import { User } from 'src/app/Model/users';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-user-deitail-admin-page',
  templateUrl: './user-deitail-admin-page.component.html',
  styleUrls: ['./user-deitail-admin-page.component.scss']
})
export class UserDeitailAdminPageComponent {

  userID!: number;
  user!: User;
  userDetail!: User;
  favorites!: Novel[];
  //Sidebar toggle show hide function
  status = false;

  addToggle()
 {
   this.status = !this.status;
 }


  constructor(
    private activatedRoute: ActivatedRoute,
    private AdminService: AdminApiService,
    private novelService: NovelDataService,
    private userService: UserDataService ) {
      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      })
    }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.userID = val['id'];
      this.fetchUserDetail(this.userID);
    })

    this.novelService.getFavoriteById(this.user.user_id).subscribe(res => {
      this.favorites = res;
      console.log(this.favorites[0].novel_id);
    })
  }

  fetchUserDetail(userID: number) {
    this.AdminService.getUserById(userID).subscribe(res => {
      this.userDetail = res;
      console.log(this.userDetail);
    })
  }
}
