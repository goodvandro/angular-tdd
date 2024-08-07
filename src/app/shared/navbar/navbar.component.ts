import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ['span { cursor: pointer }'],
})
export class NavbarComponent implements OnInit {
  constructor(
    readonly authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.userService.logout().subscribe(() => {});
  }
}
