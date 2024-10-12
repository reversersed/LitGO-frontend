import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'CurrentUser',
      'Login',
      'LogoutUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    userServiceSpy.CurrentUser.calls.reset();
  });

  it('should create', () => {
    userServiceSpy.CurrentUser.and.returnValue(signal(null));
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(userServiceSpy.CurrentUser).toHaveBeenCalled();
  });
});
