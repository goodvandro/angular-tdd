import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { UserComponent } from './user.component';

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
      declarations: [UserComponent, AlertComponent],
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

  // it('displays activation failure message when token is invalid', () => {
  //   subscriber.next({ id: '456' });
  //   const request = httpTestingController.expectOne('/api/1.0/users/token/456');
  //   request.flush({}, { status: 400, statusText: 'Bad Request' });
  //   fixture.detectChanges();
  //   const alert = fixture.nativeElement.querySelector('.alert');
  //   expect(alert?.textContent).toContain('Activation failure');
  // });

  // it('displays spinner during activation request', () => {
  //   subscriber.next({ id: '123' });
  //   const request = httpTestingController.expectOne('/api/1.0/users/token/123');
  //   fixture.detectChanges();
  //   expect(
  //     fixture.nativeElement.querySelector('span[role="status"]')
  //   ).toBeTruthy();
  //   request.flush({});
  //   fixture.detectChanges();
  //   expect(
  //     fixture.nativeElement.querySelector('span[role="status"]')
  //   ).toBeFalsy();
  // });
});
