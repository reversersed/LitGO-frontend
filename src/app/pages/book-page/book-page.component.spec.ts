import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPageComponent } from './book-page.component';
import { provideRouter } from '@angular/router';
import { BookService } from '../../service/http/book.service';
import { UserService } from '../../service/http/user.service';

describe('BookPageComponent', () => {
  let component: BookPageComponent;
  let fixture: ComponentFixture<BookPageComponent>;
  let bookservice: jasmine.SpyObj<BookService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['CurrentUser']);
    bookservice = jasmine.createSpyObj<BookService>('BookService', [
      'getBook',
      'getByGenre',
    ]);
    await TestBed.configureTestingModule({
      imports: [BookPageComponent],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: bookservice },
        {
          provide: UserService,
          useValue: userServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
