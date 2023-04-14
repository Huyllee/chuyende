import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRegister } from 'src/app/Model/users';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  myRepass: string = '';
  myPass: string = '';
  isSubmitted = false;
  returnUrl = '';

  constructor(private router: Router, private buider: FormBuilder, private activatedRoute: ActivatedRoute, private registerService: UserDataService) {}

  fullname = new FormControl('',[
    Validators.required,
  ]);

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('',[
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(25),
  ]);

  repassword = new FormControl('',[
    Validators.required,
    Validators.minLength(8),
  ]);

  registerForm = this.buider.group({
    fullname: this.fullname,
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

  ngOnInit(): void {
    this.returnUrl= this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const user: IUserRegister = {
      full_name: this.fullname.value!,
      email: this.email.value!,
      password: this.password.value!,
      repassword: this.repassword.value!
    };

    this.registerService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
