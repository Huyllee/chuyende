import { Component } from '@angular/core';
import { Novel, chaptersById } from 'src/app/Model/novel';
import { User } from 'src/app/Model/users';
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

  addToggle()
  {
    this.status = !this.status;
  }

  constructor(private userService: UserDataService, private novelService: NovelDataService) {
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

    novelService.getChaptersByVolumeId().subscribe(chapters => this.chapters = chapters);
    novelService.getAllNovels().subscribe(novels => this.novels = novels);
  }

}
