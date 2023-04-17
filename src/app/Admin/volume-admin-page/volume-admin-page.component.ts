import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { volumes } from 'src/app/Model/novel';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-volume-admin-page',
  templateUrl: './volume-admin-page.component.html',
  styleUrls: ['./volume-admin-page.component.scss']
})
export class VolumeAdminPageComponent {

  public dataSource!: MatTableDataSource<volumes>
  public volumes!: volumes[]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

   //Sidebar toggle show hide function
   status = false;

   addToggle()
  {
    this.status = !this.status;
  }

  displayedColumns: string[] = [
    'volume_id',
    'novel_id',
    'volume_title',
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
    this.getVolume();
    console.log(this.getVolume());

  }

  getVolume() {
    this.AdminService.getVolumes()
      .subscribe(res => {
        this.volumes = res;
        this.dataSource = new MatTableDataSource(this.volumes)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.volumes);

      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(volume_id: number) {
    this.router.navigate(['admin-update-volume', volume_id])
  }

  delete(volume_id: string) {
    this.confrm.showConfirm(("Are you sure want to delete ?"),

    () => {
      this.AdminService.deleteVolume(volume_id).subscribe(res=> {
        if (res.ok === true) {
          this.toast.success({ detail: "Success", summary: "Delete Update", duration: 3000 });
          this.getVolume();
        } else {
          console.log("Unknown response from server: ", res);
        }
      });
    },
    () => {}
  );

  }

}
