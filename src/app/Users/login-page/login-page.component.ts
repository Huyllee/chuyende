import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  myEmail: string = '';
  myPass: string = '';
  isSubmitted = false;
  returnUrl = '';

  constructor(private router: Router, private buider: FormBuilder, private loginService: UserDataService, private activatedRoute: ActivatedRoute) {
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
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    // alert(`email: ${this.fc.email.value},
    // password: ${this.fc.password.value}`)

    this.loginService.login({email: this.email.value!,
      password: this.password.value!}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl)
      })
  }
}
