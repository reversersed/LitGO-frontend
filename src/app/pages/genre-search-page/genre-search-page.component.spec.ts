import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSearchPageComponent } from './genre-search-page.component';
import { provideRouter } from '@angular/router';
import { BookService } from '../../service/http/book.service';
import { CategoryService } from '../../service/http/category.service';

describe('GenreSearchPageComponent', () => {
  let component: GenreSearchPageComponent;
  let fixture: ComponentFixture<GenreSearchPageComponent>;
  let bookservice: jasmine.SpyObj<BookService>;
  let genreservice: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {
    bookservice = jasmine.createSpyObj<BookService>('BookService', [
      'getBook',
      'getByGenre',
    ]);
    genreservice = jasmine.createSpyObj<CategoryService>('CategoryService', [
      'getTree',
    ]);

    await TestBed.configureTestingModule({
      imports: [GenreSearchPageComponent],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: bookservice },
        { provide: CategoryService, useValue: genreservice },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
