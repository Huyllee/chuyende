import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { chaptersById } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-chapters-admin-page',
  templateUrl: './chapters-admin-page.component.html',
  styleUrls: ['./chapters-admin-page.component.scss']
})
export class ChaptersAdminPageComponent {
  public dataSource!: MatTableDataSource<chaptersById>
  public chapters!: chaptersById[]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

   //Sidebar toggle show hide function
   status = false;

   addToggle()
  {
    this.status = !this.status;
  }

  displayedColumns: string[] = [
    'chapter_id',
    'volume_id',
    'title',
    'content',
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
    this.getChapter();
    console.log(this.getChapter());

  }

  getChapter() {
    this.AdminService.getChapters()
      .subscribe(res => {
        this.chapters = res;
        this.dataSource = new MatTableDataSource(this.chapters)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.chapters);

      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(chapter_id: number) {
    this.router.navigate(['admin-update-chapter', chapter_id])
  }

  delete(chapter_id: string) {
    this.confrm.showConfirm(("Are you sure want to delete ?"),

    () => {
      this.AdminService.deleteChapter(chapter_id).subscribe(res=> {
        if (res.ok === true) {
          this.toast.success({ detail: "Success", summary: "Delete Update", duration: 3000 });
          this.getChapter();
        } else {
          console.log("Unknown response from server: ", res);
        }
      });
    },
    () => {}
  );

  }
}
