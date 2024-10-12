import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueComponent } from './catalogue.component';
import { CategoryService } from '../../../service/http/category.service';
import { of } from 'rxjs';
import Category from '../../../models/category.model';
import Genre from '../../../models/genre.model';
import { provideRouter } from '@angular/router';

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;

  const mockCategory: Category[] = [
    {
      name: 'category',
      translitName: 'category-123',
      genres: [],
    },
  ];
  beforeEach(async () => {
    categoryService = jasmine.createSpyObj('CategoryService', ['getAll']);
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: CategoryService, useValue: categoryService },
      ],
      imports: [CatalogueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    categoryService.getAll.and.returnValue(of(mockCategory));
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(categoryService.getAll).toHaveBeenCalled();
  });
});
