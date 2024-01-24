import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { ActivateComponent } from './activate.component';
import { AlertComponent } from '../shared/alert/alert.component';

type RouteParams = { id: string };

describe('ActivateComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: ActivateComponent;
  let fixture: ComponentFixture<ActivateComponent>;
  let httpTestingController: HttpTestingController;
  let subscriber!: Subscriber<RouteParams>;

  beforeEach(async () => {
    const observable = new Observable<RouteParams>((sub) => (subscriber = sub));
    await TestBed.configureTestingModule({
      declarations: [ActivateComponent, AlertComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: observable } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sends account activation request', () => {
    subscriber.next({ id: '123' });
    const request = httpTestingController.match('/api/1.0/users/token/123');
    expect(request.length).toBe(1);
  });

  it('displays activation success message when token is valid', () => {
    subscriber.next({ id: '123' });
    const request = httpTestingController.expectOne('/api/1.0/users/token/123');
    request.flush({});
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert?.textContent).toContain('Account is activated');
  });

  it('displays activation failure message when token is invalid', () => {
    subscriber.next({ id: '456' });
    const request = httpTestingController.expectOne('/api/1.0/users/token/456');
    request.flush({}, { status: 400, statusText: 'Bad Request' });
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert?.textContent).toContain('Activation failure');
  });
});
