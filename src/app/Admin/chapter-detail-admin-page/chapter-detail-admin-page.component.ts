import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chaptersById } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-chapter-detail-admin-page',
  templateUrl: './chapter-detail-admin-page.component.html',
  styleUrls: ['./chapter-detail-admin-page.component.scss']
})
export class ChapterDetailAdminPageComponent {
  chapterID!: number;
  chapterDetail!: chaptersById;
  //Sidebar toggle show hide function
  status = false;

  addToggle()
 {
   this.status = !this.status;
 }


  constructor(
    private activatedRoute: ActivatedRoute,
    private AdminService: AdminApiService,
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.chapterID = val['id'];
      this.fetchChapterDetail(this.chapterID);
    })

  }

  fetchChapterDetail(chapterID: number) {
    this.AdminService.getChapterById(chapterID).subscribe(res => {
      this.chapterDetail = res;
      console.log(this.chapterDetail);
    })
  }

  logout(){
    this.AdminService.logout();
  }
}
