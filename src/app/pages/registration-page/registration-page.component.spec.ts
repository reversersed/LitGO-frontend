import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { UserService } from '../../service/http/user.service';
import { provideRouter } from '@angular/router';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let service: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPageComponent],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: service },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render all inputs', () => {
    let inputIds: {
      Id: string;
    }[] = [
      { Id: 'login' },
      { Id: 'password' },
      { Id: 'email' },
      { Id: 'passwordRepeat' },
    ];

    inputIds.forEach((testCase) => {
      let input = document.getElementById(testCase.Id) as HTMLInputElement;
      expect(input).toBeTruthy();
    });
  });
});
