import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CategoryService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('expect http call to api after get all function', () => {
    let sub = service.getAll().subscribe();
    expect(
      controller.expectOne(
        (environment.serverString.length > 0
          ? environment.serverString + ':' + environment.serverPort
          : '') +
          '/' +
          environment.serverEntryPoint +
          '/genres/all'
      )
    ).toBeTruthy();
    sub.unsubscribe();
  });
});
