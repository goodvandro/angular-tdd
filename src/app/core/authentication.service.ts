import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
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

  constructor(private httpClient: HttpClient) {
    const storageData = localStorage.getItem('auth');
    if (storageData) {
      try {
        this.loggedInUser = JSON.parse(storageData) as LoggedInUser;
      } catch (err) {}
    }
  }

  authenticate(email: string, password: string) {
    return this.httpClient.post('/api/1.0/auth', { email, password }).pipe(
      tap((body) => {
        if (body) {
          this.setLoggedInUser(body as User);
        }
        return body;
      })
    );
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
    return this.httpClient.post('/api/1.0/logout', {}).subscribe(() => {});
  }
}
