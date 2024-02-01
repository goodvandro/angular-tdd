import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit {
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // this.activationStatus = 'inProgress';
      this.userService.getUserById(params['id']).subscribe({
        next: (data) => {
          this.user = data as User;
          // this.activationStatus = 'success';
        },
        error: () => {
          // this.activationStatus = 'fail';
        },
      });
    });
  }
}
