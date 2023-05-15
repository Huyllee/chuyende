import { Component, OnInit } from '@angular/core';
import { Novel, chaptersById, volumeById, volumes } from 'src/app/Model/novel';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';

@Component({
  selector: 'app-novel-detail-admin-page',
  templateUrl: './novel-detail-admin-page.component.html',
  styleUrls: ['./novel-detail-admin-page.component.scss']
})
export class NovelDetailAdminPageComponent implements OnInit {

  novelID!: number;
  novelDetail!: Novel;
  volumes: volumes[] = [];
  chapters: chaptersById[] = [];
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
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.novelID = val['id'];
      this.fetchNovelDetail(this.novelID);
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.novelService.getVolumeById(id).subscribe(volumes => {
      this.volumes = volumes;
    });

    this.novelService.getChaptersByVolumeId().subscribe(chapters => {
      this.chapters = chapters;
    });
  }

  fetchNovelDetail(novelID: number) {
    this.AdminService.getNovelByGenre(novelID).subscribe(res => {
      this.novelDetail = res;
      console.log(this.novelDetail);
    })
  }

  logout(){
    this.AdminService.logout();
  }
}
