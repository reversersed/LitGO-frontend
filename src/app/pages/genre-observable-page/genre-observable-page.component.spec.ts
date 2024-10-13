import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreObservablePageComponent } from './genre-observable-page.component';
import { CategoryService } from '../../service/http/category.service';
import { of } from 'rxjs';
import Category from '../../models/category.model';

describe('GenreObservablePageComponent', () => {
  let component: GenreObservablePageComponent;
  let fixture: ComponentFixture<GenreObservablePageComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {
    categoryService = jasmine.createSpyObj('CategoryService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [GenreObservablePageComponent],
      providers: [
        {
          provide: CategoryService,
          useValue: categoryService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreObservablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    categoryService.getAll.and.returnValue(of([] as Category[]));
    expect(component).toBeTruthy();
  });
});
