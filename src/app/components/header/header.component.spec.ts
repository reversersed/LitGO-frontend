import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';
import { signal } from '@angular/core';
import { AuthorService } from '../../service/http/author.service';
import { BookService } from '../../service/http/book.service';
import { CategoryService } from '../../service/http/category.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let bookService: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'CurrentUser',
      'Login',
      'LogoutUser',
    ]);
    categoryService = jasmine.createSpyObj('CategoryService', ['getAll']);
    authorService = jasmine.createSpyObj('AuthorService', ['getSuggestion']);
    bookService = jasmine.createSpyObj('BookService', ['getSuggestion']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: userServiceSpy },
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
