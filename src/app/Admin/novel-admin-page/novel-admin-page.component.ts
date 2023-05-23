import { NgToastService } from 'ng-angular-popup';
import { Component, OnInit, ViewChild } from '@angular/core';
//metarila
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// ng-confirm -box
import { NgConfirmService } from 'ng-confirm-box';

import { Novel } from 'src/app/Model/novel';
import { Router } from '@angular/router';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-novel-admin-page',
  templateUrl: './novel-admin-page.component.html',
  styleUrls: ['./novel-admin-page.component.scss']
})
export class NovelAdminPageComponent implements OnInit {

  public dataSource!: MatTableDataSource<Novel>
  public novels!: Novel[]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

   //Sidebar toggle show hide function
   status = false;

   addToggle()
  {
    this.status = !this.status;
  }

  displayedColumns: string[] = [
    'novel_id',
    'title',
    'author',
    'artist',
    // 'description',
    'cover_image',
    'created_at',
    'updated_at',
    'action'
  ]
  constructor(
    private AdminService: AdminApiService,
    private router: Router,
    private confrm: NgConfirmService,
    private toast: NgToastService
  ) { }

  ngOnInit() {
    this.getNovel();
    console.log(this.getNovel());

  }

  getNovel() {
    this.AdminService.getNovel()
      .subscribe(res => {
        this.novels = res;
        this.dataSource = new MatTableDataSource(this.novels)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.novels);

      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(novel_id: number) {
    this.router.navigate(['admin-update-novel', novel_id])
  }

  delete(novel_id: string) {
    this.confrm.showConfirm(("Are you sure want to delete ?"),

    () => {
      this.AdminService.deleteNovel(novel_id).subscribe(res=> {
        if (res.ok === true) {
          this.toast.success({ detail: "Success", summary: "Delete Update", duration: 3000 });
          this.getNovel();
        } else {
          console.log("Unknown response from server: ", res);
        }
      });
    },
    () => {}
  );

  }

  logout(){
    this.AdminService.logout();
  }
}
