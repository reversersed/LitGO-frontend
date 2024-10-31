import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularBooksPageComponent } from './popular-books-page.component';
import { provideRouter } from '@angular/router';
import { BookService } from '../../service/http/book.service';
import { CategoryService } from '../../service/http/category.service';
import { of } from 'rxjs';

describe('PopularBooksPageComponent', () => {
  let component: PopularBooksPageComponent;
  let fixture: ComponentFixture<PopularBooksPageComponent>;
  let bookservice: jasmine.SpyObj<BookService>;
  let genreservice: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {
    bookservice = jasmine.createSpyObj<BookService>('BookService', ['find']);
    genreservice = jasmine.createSpyObj<CategoryService>('CategoryService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      imports: [PopularBooksPageComponent],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: bookservice },
        { provide: CategoryService, useValue: genreservice },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularBooksPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    bookservice.find.and.returnValue(of([]));
    genreservice.getAll.and.returnValue(of([]));
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
