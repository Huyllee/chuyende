import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-genre-detail-admin-page',
  templateUrl: './genre-detail-admin-page.component.html',
  styleUrls: ['./genre-detail-admin-page.component.scss']
})
export class GenreDetailAdminPageComponent {
  genreID!: number;
  genreDetail!: Categories;
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
      this.genreID = val['id'];
      this.fetchGenreDetail(this.genreID);
    })

  }

  fetchGenreDetail(genreID: number) {
    this.AdminService.getGenreById(genreID).subscribe(res => {
      this.genreDetail = res;
      console.log(this.genreDetail);
    })
  }

  logout(){
    this.AdminService.logout();
  }
}
