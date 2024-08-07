import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  @ViewChild('emailInput') emailInput!: FormControl;
  @ViewChild('passwordInput') passwordInput!: FormControl;

  email: string = '';
  password: string = '';

  error: string = '';

  apiProgress: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  isDisabled(): boolean {
    return (
      !this.email ||
      !this.password ||
      this.isInvalid(this.emailInput) ||
      this.isInvalid(this.passwordInput)
    );
  }

  onClickLogin() {
    this.apiProgress = true;
    this.authenticationService
      .authenticate(this.email, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.error = err.error.message;
          this.apiProgress = false;
        },
      });
  }

  isInvalid(field: FormControl) {
    const { invalid, dirty, touched } = field;
    return invalid && (dirty || touched);
  }

  onChange() {
    this.error = '';
  }
}
