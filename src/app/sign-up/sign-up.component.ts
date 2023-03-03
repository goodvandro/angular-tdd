import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl(''),
  });

  apiProgress = false;
  signUpSuccess = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  isDisabled(): boolean {
    return this.form.get('password')?.value
      ? this.form.get('password')?.value !==
          this.form.get('passwordRepeat')?.value
      : true;
  }

  onClickSignUp() {
    this.apiProgress = true;

    const body = this.form.value;
    delete body.passwordRepeat;

    this.userService
      .signUp({
        username: this.form.get('username')?.value,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe(() => {
        this.signUpSuccess = true;
      });
  }
}
