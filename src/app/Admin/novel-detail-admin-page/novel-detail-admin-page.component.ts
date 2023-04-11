import { Component, OnInit } from '@angular/core';
import { Novel } from 'src/app/Model/novel';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-novel-detail-admin-page',
  templateUrl: './novel-detail-admin-page.component.html',
  styleUrls: ['./novel-detail-admin-page.component.scss']
})
export class NovelDetailAdminPageComponent implements OnInit {

  novelID!: number;
  novelDetail!: Novel;

  constructor(private activatedroute: ActivatedRoute, private AdminService: AdminApiService) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(val => {
      this.novelID = val['id'];
      this.fetchUserDetail(this.novelID);
    })
  }
  fetchUserDetail(novelID: number) {
    this.AdminService.getNovelById(novelID).subscribe(res => {
      this.novelDetail = res;
      console.log(this.novelDetail);
    })
  }
}
