import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestBooksPageComponent } from './newest-books-page.component';
import { BookService } from '../../service/http/book.service';
import { CategoryService } from '../../service/http/category.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import Book from '../../models/book.model';
import { UserService } from '../../service/http/user.service';
import { signal } from '@angular/core';
import { FileService } from '../../service/http/file.service';

describe('NewestBooksPageComponent', () => {
  let component: NewestBooksPageComponent;
  let fixture: ComponentFixture<NewestBooksPageComponent>;
  let bookservice: jasmine.SpyObj<BookService>;
  let genreservice: jasmine.SpyObj<CategoryService>;
  let userService: jasmine.SpyObj<UserService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', ['getBookCover']);
    bookservice = jasmine.createSpyObj<BookService>('BookService', ['find']);
    userService = jasmine.createSpyObj<UserService>('UserService', [
      'CurrentUser',
    ]);
    genreservice = jasmine.createSpyObj<CategoryService>('CategoryService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      imports: [NewestBooksPageComponent],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: bookservice },
        { provide: CategoryService, useValue: genreservice },
        { provide: UserService, useValue: userService },
        {
          provide: FileService,
          useValue: fileServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewestBooksPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    bookservice.find.and.returnValue(of([]));
    genreservice.getAll.and.returnValue(of([]));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should call to api after scroll to bottom', async () => {
    userService.CurrentUser.and.returnValue(signal(null));
    bookservice.find.and.returnValue(
      of([
        {
          name: 'Книга',
          picture: 'https://picture.com',
          authors: [{ name: 'Автор', translitname: 'author' }],
        } as Book,
      ] as Book[])
    );
    genreservice.getAll.and.returnValue(of([]));
    const delay = function delay(time: number) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    };

    component.ngOnInit();
    fixture.detectChanges();

    await delay(2000);

    window.scroll({
      top: (3 * document.documentElement.scrollHeight) / 4 + 30,
    });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(component.currentPage).toEqual(1);
    expect(bookservice.find).toHaveBeenCalledWith(
      null,
      jasmine.anything(),
      1,
      'Newest',
      0
    );
  });
});
