import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Novel, chaptersById, volumes } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';

@Component({
  selector: 'app-volume-detail-admin-page',
  templateUrl: './volume-detail-admin-page.component.html',
  styleUrls: ['./volume-detail-admin-page.component.scss']
})
export class VolumeDetailAdminPageComponent {
  volumeID!: number;
  volumeDetail!: volumes;
  volumes!: volumes;
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
      this.volumeID = val['id'];
      this.fetchVolumeDetail(this.volumeID);
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.novelService.getChapterByVolume(id).subscribe(chapters => {
      this.chapters = chapters;
    });
    console.log(this.chapters);

  }

  fetchVolumeDetail(volumeID: number) {
    this.AdminService.getVolumeById(volumeID).subscribe(res => {
      this.volumeDetail = res;
      console.log(this.volumeDetail);
    })
  }
}
