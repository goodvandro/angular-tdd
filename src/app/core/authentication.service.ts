import { Injectable } from '@angular/core';
import { LoggedInUser, User } from 'types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedInUser: LoggedInUser = {
    id: 0,
    username: '',
    email: '',
    isLoggedIn: false,
  };

  constructor() {
    const storageData = localStorage.getItem('auth');
    if (storageData) {
      try {
        this.loggedInUser = JSON.parse(storageData) as LoggedInUser;
      } catch (err) {}
    }
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = {
      ...user,
      isLoggedIn: true,
    };
    localStorage.setItem('auth', JSON.stringify(this.loggedInUser));
  }

  logout() {
    this.loggedInUser = {
      id: 0,
      username: '',
      email: '',
      isLoggedIn: false,
    };
    localStorage.removeItem('auth');
  }
}
