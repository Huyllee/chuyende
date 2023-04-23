import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Categories } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-genre-admin-page',
  templateUrl: './genre-admin-page.component.html',
  styleUrls: ['./genre-admin-page.component.scss']
})
export class GenreAdminPageComponent {
  public dataSource!: MatTableDataSource<Categories>
  public genre!: Categories[]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

   //Sidebar toggle show hide function
   status = false;

   addToggle()
  {
    this.status = !this.status;
  }

  displayedColumns: string[] = [
    'category_id',
    'category_name',
    'description',
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
    this.getGenre();
    console.log(this.getGenre());

  }

  getGenre() {
    this.AdminService.getGenre()
      .subscribe(res => {
        this.genre = res;
        this.dataSource = new MatTableDataSource(this.genre)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.genre);

      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(category_id: number) {
    this.router.navigate(['admin-update-genre', category_id])
  }

  delete(category_id: string) {
    this.confrm.showConfirm(("Are you sure want to delete ?"),

    () => {
      this.AdminService.deleteGenre(category_id).subscribe(res=> {
        if (res.ok === true) {
          this.toast.success({ detail: "Success", summary: "Delete Update", duration: 3000 });
          this.getGenre();
        } else {
          console.log("Unknown response from server: ", res);
        }
      });
    },
    () => {}
  );

  }
}
