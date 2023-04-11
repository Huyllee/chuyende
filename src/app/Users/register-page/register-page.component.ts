import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  myRepass: string = '';
  myPass: string = '';


  constructor(private router: Router, private buider: FormBuilder) {}

  fullname = new FormControl('',[
    Validators.required,
  ]);

  cccdNumber = new FormControl('',[
    Validators.required,
  ]);

  phoneNumber = new FormControl('',[
    Validators.required,
  ]);

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(25),
    // Validators.pattern( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
  ]);

  repassword = new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    // Validators.pattern( /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
  ]);

  registerForm = this.buider.group({
    fullname: this.fullname,
    cccdNumber: this.cccdNumber,
    phoneNumber: this.phoneNumber,
    password: this.password,
    email: this.email
  })

  matchPassword() {
    this.myPass = this.password.value!;
    this.myRepass = this.repassword.value!;
    if (this.myPass !== this.myRepass) {
      this.repassword.setErrors({ mismatch: true });
    } else {
      this.repassword.setErrors(null);
    }
  }
}
