import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let service: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    service = jasmine.createSpyObj('UserService', [
      'CurrentUser',
      'Auth',
      'Login',
    ]);
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: service },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
