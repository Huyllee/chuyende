import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/users';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-user-deitail-admin-page',
  templateUrl: './user-deitail-admin-page.component.html',
  styleUrls: ['./user-deitail-admin-page.component.scss']
})
export class UserDeitailAdminPageComponent {

  userID!: number;
  userDetail!: User;
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
      this.userID = val['id'];
      this.fetchUserDetail(this.userID);
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  fetchUserDetail(userID: number) {
    this.AdminService.getUserById(userID).subscribe(res => {
      this.userDetail = res;
      console.log(this.userDetail);
    })
  }
}
