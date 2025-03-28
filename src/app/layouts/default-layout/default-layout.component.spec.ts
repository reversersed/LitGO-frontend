import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutComponent } from './default-layout.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';
import { signal } from '@angular/core';
import { AuthorService } from '../../service/http/author.service';
import { CategoryService } from '../../service/http/category.service';
import { BookService } from '../../service/http/book.service';
import { of } from 'rxjs';
import Category from '../../models/category.model';
import { FileService } from '../../service/http/file.service';

describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let bookService: jasmine.SpyObj<BookService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', ['getBookCover']);
    userService = jasmine.createSpyObj('UserService', ['CurrentUser', 'Auth']);
    categoryService = jasmine.createSpyObj('CategoryService', ['getAll']);
    authorService = jasmine.createSpyObj('AuthorService', ['getSuggestion']);
    bookService = jasmine.createSpyObj('BookService', ['getSuggestion']);

    await TestBed.configureTestingModule({
      imports: [DefaultLayoutComponent],
      providers: [
        provideRouter([]),
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: CategoryService,
          useValue: categoryService,
        },
        {
          provide: AuthorService,
          useValue: authorService,
        },
        {
          provide: BookService,
          useValue: bookService,
        },
        {
          provide: FileService,
          useValue: fileServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    userService.Auth.and.returnValue(of(null));
    categoryService.getAll.and.returnValue(of([] as Category[]));
    userService.CurrentUser.and.returnValue(signal(null));
    expect(component).toBeTruthy();
  });
});
