import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Novel, chaptersById } from 'src/app/Model/novel';
import { User } from 'src/app/Model/users';
import { AdminApiService } from 'src/app/Services/admin-api.service';
// ng-confirm -box
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-users-admin-page',
  templateUrl: './users-admin-page.component.html',
  styleUrls: ['./users-admin-page.component.scss']
})
export class UsersAdminPageComponent {
  public dataSource!: MatTableDataSource<User>
  public users!: User[]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

   //Sidebar toggle show hide function
   status = false;

   addToggle()
  {
    this.status = !this.status;
  }

  displayedColumns: string[] = [
    'user_id',
    'full_name',
    'email',
    'password',
    'role',
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
    this.getUsers();
    console.log(this.getUsers());

  }

  getUsers() {
    this.AdminService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.users);

      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // edit(user_id: number) {
  //   this.router.navigate(['admin-update-user', user_id])
  // }

  delete(user_id: string) {
    this.confrm.showConfirm(("Are you sure want to delete ?"),

    () => {
      this.AdminService.deleteUser(user_id).subscribe(res=> {
        if (res.ok === true) {
          this.toast.success({ detail: "Success", summary: "Delete Update", duration: 3000 });
          this.getUsers();
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
