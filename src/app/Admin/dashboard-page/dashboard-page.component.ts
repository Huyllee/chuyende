import { Component } from '@angular/core';
import { Novel, chaptersById, rating } from 'src/app/Model/novel';
import { User } from 'src/app/Model/users';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  //Sidebar toggle show hide function
  status = false;
  users: User[] = [];
  novels: Novel[] = [];
  chapters: chaptersById[] = [];
  totalNovels: number = 0;
  totalUsers: number = 0;
  totalRatings: number = 0;

  addToggle()
  {
    this.status = !this.status;
  }

  constructor(private userService: UserDataService, private adminService: AdminApiService, private novelService: NovelDataService) {
    userService.getUsers().subscribe((users) => {
      const totalUsers = users.reduce((sum: number, user: User) => {
        return sum + 1;
      }, 0);
      console.log('Total users:', totalUsers);
      this.totalUsers = totalUsers;
    });

    novelService.getAllNovels().subscribe((novels) => {
      const totalNovels = novels.reduce((sum: number, novel: Novel) => {
        return sum + 1;
      }, 0);
      console.log('Total novels:', totalNovels);
      this.totalNovels = totalNovels;
    });

    novelService.getAllRatings().subscribe((ratings) => {
      const totalRatings = ratings.reduce((sum: number, rating: rating) => {
        return sum + 1;
      }, 0);
      console.log('Total ratings:', totalRatings);
      this.totalRatings = totalRatings;
    });

    // novelService.getChaptersByVolumeId().subscribe(chapters => this.chapters = chapters);
    // novelService.getAllNovels().subscribe(novels => this.novels = novels);

    this.novelService.getAllNovels().subscribe(res => {
      this.novels = res;
      this.novels.sort((a, b) => {
        if (a.updated_at && b.updated_at) {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        } else {
          return 0;
        }
      });
      console.log(this.novels);

    })

    this.novelService.getChaptersByVolumeId().subscribe(res => {
      this.chapters = res;
      this.chapters.sort((a, b) => {
        if (a.updated_at && b.updated_at) {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        } else {
          return 0;
        }
      });
      console.log(this.chapters);

    })
  }

  logout(){
    this.adminService.logout();
  }
}
