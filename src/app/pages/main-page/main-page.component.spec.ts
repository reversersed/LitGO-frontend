import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { provideRouter } from '@angular/router';
import { BookService } from '../../service/http/book.service';
import { of } from 'rxjs';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let bookService: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    bookService = jasmine.createSpyObj('BookService', ['find']);
    await TestBed.configureTestingModule({
      imports: [MainPageComponent],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: bookService },
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
});
