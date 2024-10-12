import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutComponent } from './default-layout.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';
import { signal } from '@angular/core';

describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['CurrentUser']);

    await TestBed.configureTestingModule({
      imports: [DefaultLayoutComponent],
      providers: [
        provideRouter([]),
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    userService.CurrentUser.calls.reset();
  });
  it('should create', () => {
    userService.CurrentUser.and.returnValue(signal(null));
    expect(component).toBeTruthy();
  });
});
