import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  myEmail: string = '';
  myPass: string = '';

  constructor(private router: Router, private buider: FormBuilder) {}

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    // Validators.pattern( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
  ]);

  loginForm = this.buider.group({
    password: this.password,
    email: this.email
  })

  login(): void {
    this.myEmail = this.email.value!;
    this.myPass = this.password.value!;
    // this.authLoginService.logon(this.myEmail, this.myPass);
  }
}
