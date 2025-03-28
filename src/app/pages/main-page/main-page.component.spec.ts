import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { provideRouter } from '@angular/router';
import { BookService } from '../../service/http/book.service';
import { of } from 'rxjs';
import Book from '../../models/book.model';
import { UserService } from '../../service/http/user.service';
import User from '../../models/user.model';
import { signal } from '@angular/core';
import { FileService } from '../../service/http/file.service';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let bookService: jasmine.SpyObj<BookService>;
  let userService: jasmine.SpyObj<UserService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', ['getBookCover']);
    bookService = jasmine.createSpyObj('BookService', ['find']);
    userService = jasmine.createSpyObj('UserService', ['CurrentUser']);
    await TestBed.configureTestingModule({
      imports: [MainPageComponent],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: bookService },
        { provide: UserService, useValue: userService },
        {
          provide: FileService,
          useValue: fileServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    bookService.find.and.returnValue(of([]));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('should render newest books panel', () => {
    userService.CurrentUser.and.returnValue(signal({} as User));
    bookService.find.and.returnValue(
      of([
        {
          name: 'Книга',
          translitname: 'kniga-link',
          picture: 'https://picture.com',
          authors: [{ name: 'Автор' }],
        },
      ] as Book[])
    );
    component.ngOnInit();
    fixture.detectChanges();
    let feed = document.getElementById('newest-book-panel') as HTMLDivElement;
    expect(feed).toBeTruthy();
  });
});
