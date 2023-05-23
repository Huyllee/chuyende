import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from 'src/app/Services/admin-api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  isSubmitted = false;
  returnUrl = '';

  constructor(private router: Router, private buider: FormBuilder, private adminService: AdminApiService, private activatedRoute: ActivatedRoute) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('',[
    Validators.required,
    Validators.minLength(8),
  ]);

  loginForm = this.buider.group({
    password: this.password,
    email: this.email
  })

  submit(){
    this.adminService.login({email: this.email.value!,
      password: this.password.value!}).subscribe(() => {
        this.router.navigate(['/admin']);
      })
  }
}
