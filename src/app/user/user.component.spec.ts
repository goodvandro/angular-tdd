import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { UserComponent } from './user.component';
import { ProfileCardComponent } from '../home/profile-card/profile-card.component';

type RouteParams = { id: string };

describe('UserComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let httpTestingController: HttpTestingController;
  let subscriber!: Subscriber<RouteParams>;

  beforeEach(async () => {
    const observable = new Observable<RouteParams>((sub) => (subscriber = sub));
    await TestBed.configureTestingModule({
      declarations: [UserComponent, AlertComponent, ProfileCardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: observable } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sends request to get user data', () => {
    subscriber.next({ id: '1' });
    const request = httpTestingController.match('/api/1.0/users/1');
    expect(request.length).toBe(1);
  });

  it('displays username on page when user is found', () => {
    subscriber.next({ id: '1' });
    const request = httpTestingController.expectOne('/api/1.0/users/1');
    request.flush({
      id: 1,
      username: 'user1',
      email: 'user1@mail.com',
    });
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h3');
    expect(header?.textContent).toContain('user1');
  });

  it('displays error message when not found user', () => {
    subscriber.next({ id: '2' });
    const request = httpTestingController.expectOne('/api/1.0/users/2');
    request.flush(
      { message: 'User not found' },
      { status: 404, statusText: 'Not Found' }
    );
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert?.textContent).toContain('User not found');
  });

  it('displays spinner during activation request', () => {
    subscriber.next({ id: '1' });
    const request = httpTestingController.expectOne('/api/1.0/users/1');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('span[role="status"]')
    ).toBeTruthy();
    request.flush({
      id: 1,
      username: 'user1',
      email: 'user1@mail.com',
    });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('span[role="status"]')
    ).toBeFalsy();
  });
});
