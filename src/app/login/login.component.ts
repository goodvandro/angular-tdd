import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  error: string = '';

  apiProgress: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  isDisabled(): boolean {
    return !this.email || !this.password;
  }

  onClickLogin() {
    this.apiProgress = true;
    this.userService.authenticate(this.email, this.password).subscribe({
      next: () => {},
      error: (err: HttpErrorResponse) => {
        this.error = err.error.message;
        this.apiProgress = false;
      },
    });
  }
}
