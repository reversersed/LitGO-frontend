import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestBooksPageComponent } from './newest-books-page.component';
import { BookService } from '../../service/http/book.service';
import { CategoryService } from '../../service/http/category.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('NewestBooksPageComponent', () => {
  let component: NewestBooksPageComponent;
  let fixture: ComponentFixture<NewestBooksPageComponent>;
  let bookservice: jasmine.SpyObj<BookService>;
  let genreservice: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {
    bookservice = jasmine.createSpyObj<BookService>('BookService', ['find']);
    genreservice = jasmine.createSpyObj<CategoryService>('CategoryService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      imports: [NewestBooksPageComponent],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: bookservice },
        { provide: CategoryService, useValue: genreservice },
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
});
