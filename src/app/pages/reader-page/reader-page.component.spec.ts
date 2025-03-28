import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderPageComponent } from './reader-page.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';
import { BookService } from '../../service/http/book.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { FileService } from '../../service/http/file.service';

describe('ReaderPageComponent', () => {
  let component: ReaderPageComponent;
  let fixture: ComponentFixture<ReaderPageComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', ['getBookFile']);
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'CurrentUser',
      'Auth',
    ]);
    bookServiceSpy = jasmine.createSpyObj('BookService', ['getBook']);

    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
        {
          provide: BookService,
          useValue: bookServiceSpy,
        },
        {
          provide: FileService,
          useValue: fileServiceSpy,
        },
      ],
      imports: [ReaderPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReaderPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    userServiceSpy.Auth.and.returnValue(of(null));
    userServiceSpy.CurrentUser.and.returnValue(signal(null));
    expect(component).toBeTruthy();
  });
});
