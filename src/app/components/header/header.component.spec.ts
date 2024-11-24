import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { UserService } from '../../service/http/user.service';
import { signal } from '@angular/core';
import { AuthorService } from '../../service/http/author.service';
import { BookService } from '../../service/http/book.service';
import { CategoryService } from '../../service/http/category.service';
import GenericService from '../../service/http/generic.service';
import { of } from 'rxjs';
import Category from '../../models/category.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let bookService: jasmine.SpyObj<BookService>;
  let genreService: jasmine.SpyObj<GenericService>;

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

  it('should render main logo button', () => {
    let button = document.getElementById('main-logo') as HTMLAnchorElement;
    expect(button).toBeTruthy();
    expect(button.innerText).toEqual('LitGO');
  });
  it('should render catalogue after button click and close after another click', () => {
    userServiceSpy.CurrentUser.and.returnValue(signal(null));
    categoryService.getAll.and.returnValue(
      of([
        { name: 'Категория', translitname: 'category', genres: [] },
      ] as Category[])
    );
    fixture.detectChanges();

    const button = document.getElementById(
      'catalogue-button'
    ) as HTMLButtonElement;
    expect(button).toBeTruthy();

    const event = new Event('click');
    button.dispatchEvent(event);
    fixture.detectChanges();

    let catalogue = document.getElementById('catalogue-wrapper');
    expect(catalogue).toBeTruthy();
    expect(categoryService.getAll).toHaveBeenCalled();

    button.dispatchEvent(event);
    fixture.detectChanges();

    catalogue = document.getElementById('catalogue-wrapper');
    expect(catalogue).toBeFalsy();
  });
});
