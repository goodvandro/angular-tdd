import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, HttpClientTestingModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Login header', () => {
      const loginPage = fixture.nativeElement as HTMLElement;
      const h1 = loginPage.querySelector('h1');
      expect(h1?.textContent).toBe('Login');
    });

    it('has email input', () => {
      const loginPage = fixture.nativeElement as HTMLInputElement;
      const label = loginPage.querySelector('label[for="email"]');
      const input = loginPage.querySelector('input[id="email"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('E-mail');
    });

    it('has password input', () => {
      const loginPage = fixture.nativeElement as HTMLInputElement;
      const label = loginPage.querySelector('label[for="password"]');
      const input = loginPage.querySelector('input[id="password"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password type for password input', () => {
      const loginPage = fixture.nativeElement as HTMLInputElement;
      const input = loginPage.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has Login button', () => {
      const loginPage = fixture.nativeElement as HTMLElement;
      const button = loginPage.querySelector('button');
      expect(button?.textContent).toContain('Login');
    });

    it('disable the button initially', () => {
      const loginPage = fixture.nativeElement as HTMLElement;
      const button = loginPage.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let button: any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let httpTestingController: HttpTestingController;
    let loginPage: HTMLInputElement;

    const setupForm = async () => {
      httpTestingController = TestBed.inject(HttpTestingController);

      loginPage = fixture.nativeElement as HTMLInputElement;

      await fixture.whenStable();

      const emailInput = loginPage.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      const passwordInput = loginPage.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      emailInput.value = 'user1@mail.com';
      emailInput.dispatchEvent(new Event('input'));
      emailInput.dispatchEvent(new Event('blur'));

      passwordInput.value = 'P4ssword';
      passwordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      button = loginPage.querySelector('button');
    };

    it('enables the button when all the fields have valid input', async () => {
      await setupForm();
      expect(button?.disabled).toBeFalsy();
    });
  });
});
