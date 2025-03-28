import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardComponent } from './book-card.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';
import { signal } from '@angular/core';
import { FileService } from '../../service/http/file.service';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', ['getBookCover']);
    userService = jasmine.createSpyObj('UserService', ['CurrentUser']);
    await TestBed.configureTestingModule({
      imports: [BookCardComponent],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userService },
        {
          provide: FileService,
          useValue: fileServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    userService.CurrentUser.and.returnValue(signal(null));
    expect(component).toBeTruthy();
  });
});
