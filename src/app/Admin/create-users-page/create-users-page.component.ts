import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Model/users';
import { AdminApiService } from 'src/app/Services/admin-api.service';
import { NovelDataService } from 'src/app/Services/novel-data.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-users-page',
  templateUrl: './create-users-page.component.html',
  styleUrls: ['./create-users-page.component.scss']
})
export class CreateUsersPageComponent {
  //Sidebar toggle show hide function
  status = false;

  createUserForm!: FormGroup;
  userIdUpdate!: number;
  public isUpdateActive: boolean = false;
  user!: User;

  addToggle()
  {
    this.status = !this.status;
  }

  roles: number[] = [
    1,
    2,
  ]

  constructor(
    private fb: FormBuilder,
    private adminService: AdminApiService,
    private novelService: NovelDataService,
    private router: Router,
    private toastService: NgToastService,
    private activatedRouter: ActivatedRoute
    ) {
  }

  full_name = new FormControl('',[Validators.required]);
  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  password = new FormControl('',[
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(25),
  ]);
  rePassword = new FormControl('',[
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(25),
  ]);
  role = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createUserForm = this.fb.group({
      full_name: this.full_name,
      email: this.email,
      password: this.password,
      rePassword: this.rePassword,
      role: this.role,
    },
    { validator: this.ConfirmedValidator('password', 'rePassword')} as AbstractControlOptions
    )

    this.activatedRouter.params.subscribe(val => {
      this.userIdUpdate = val["id"];
      if (val && val["id"]) {
        this.adminService.getUserById(this.userIdUpdate).subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.user = res;
        })
      }
      console.log(this.userIdUpdate);
    })

  }

  submit() {
    this.adminService.postUser(this.createUserForm.value).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "User created successfully", duration: 3000 });
        this.createUserForm.reset();
      }
    })
  }


  update() {
    this.adminService.updateUser(this.createUserForm.value, this.userIdUpdate).subscribe(res => {
      if (res.ok === true) {
        this.toastService.success({ detail: "Success", summary: "User updated successfully", duration: 3000 });
        this.createUserForm.reset();
        this.router.navigate(['admin/users']);
      }
    })

  }

  fillFormUpdate(user: User) {
    this.createUserForm.setValue({
      full_name: user.full_name,
      email: user.email,
      password: user.password,
      role: user.role,
    })
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  logout(){
    this.adminService.logout();
  }
}
