import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor() {}

  ngOnInit(): void {}

  isDisabled(): boolean {
    return !this.email || !this.password;
  }
}
