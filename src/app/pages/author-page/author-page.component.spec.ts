import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorPageComponent } from './author-page.component';
import { AuthorService } from '../../service/http/author.service';
import { FileService } from '../../service/http/file.service';
import { provideRouter } from '@angular/router';

describe('AuthorPageComponent', () => {
  let component: AuthorPageComponent;
  let fixture: ComponentFixture<AuthorPageComponent>;

  let authorService: jasmine.SpyObj<AuthorService>;
  let fileServiceSpy: jasmine.SpyObj<FileService>;
  beforeEach(async () => {
    fileServiceSpy = jasmine.createSpyObj('FileService', ['getBookFile']);
    authorService = jasmine.createSpyObj<AuthorService>('AuthorService', [
      'getAuthor',
    ]);
    await TestBed.configureTestingModule({
      imports: [AuthorPageComponent],
      providers: [
        provideRouter([]),
        { provide: AuthorService, useValue: authorService },
        {
          provide: FileService,
          useValue: fileServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
