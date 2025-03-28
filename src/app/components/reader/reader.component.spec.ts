import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './reader.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['CurrentUser']);

    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
      imports: [ReaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
