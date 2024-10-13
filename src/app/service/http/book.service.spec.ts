import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

describe('BookService', () => {
  let service: BookService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BookService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call request to api', () => {
    let sub = service.getSuggestion('query request').subscribe();

    expect(
      controller.expectOne(
        environment.serverString +
          ':' +
          environment.serverPort +
          '/' +
          environment.serverEntryPoint +
          '/books/suggest?query=query%20request'
      )
    ).toBeTruthy();

    sub.unsubscribe();
  });
});
