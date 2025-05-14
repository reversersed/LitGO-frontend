import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';
import { provideRouter } from '@angular/router';
import { AuthorService } from '../../../service/http/author.service';
import { BookService } from '../../../service/http/book.service';
import { of } from 'rxjs';
import Book from '../../../models/book.model';
import Author from '../../../models/author.model';
import { FileService } from '../../../service/http/file.service';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;
  let authorService: jasmine.SpyObj<AuthorService>;
  let bookService: jasmine.SpyObj<BookService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;

  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', [
      'getBookCover',
      'getAuthorProfile',
    ]);
    authorService = jasmine.createSpyObj('AuthorService', ['getSuggestion']);
    bookService = jasmine.createSpyObj('BookService', ['getSuggestion']);

    await TestBed.configureTestingModule({
      imports: [SearchbarComponent],
      providers: [
        provideRouter([]),
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

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call to api after search test was entered', () => {
    fileServiceSpy.getBookCover.and.returnValue(of({}));
    fileServiceSpy.getAuthorProfile.and.returnValue(of({}));
    let searchCallback = spyOn(component, 'searchsuggestionBooks').and.callFake(
      (e) => {
        expect((e.target as HTMLInputElement).value).toEqual('Война и мир');
        component.data$ = of({
          book: [
            {
              id: '1',
              name: 'Книга',
              translitname: 'kniga',
              picture: 'https://picture.com',
            } as Book,
          ],
          author: [
            {
              id: '2',
              name: 'Автор',
              translitname: 'author',
              profilepicture: 'https://picture.com',
            } as Author,
          ],
        });
      }
    );
    fixture.detectChanges();

    let input = document.getElementById('search-input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.placeholder).toEqual('Искать на LitGO');

    input.value = 'Война и мир';
    const inputEvent = new Event('input');
    input.dispatchEvent(inputEvent);
    fixture.detectChanges();

    expect(searchCallback).toHaveBeenCalled();

    const bookElement = document.getElementById('1') as HTMLAnchorElement;
    const authorElement = document.getElementById('2') as HTMLAnchorElement;

    expect(bookElement).toBeTruthy();
    expect(authorElement).toBeTruthy();

    expect(bookElement.href.endsWith('/book/kniga')).toBeTrue();
    expect(authorElement.href.endsWith('/author/author')).toBeTrue();
  });
});
