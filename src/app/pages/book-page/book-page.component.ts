import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import Book from '../../models/book.model';

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [],
  templateUrl: './book-page.component.html',
  styles: ``,
})
export class BookPageComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  paramSubscription!: Subscription;
  bookModel?: Observable<Book> = undefined;

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params) =>
      this.reloadBookModel(params['name'])
    );
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

  reloadBookModel(modelName: string) {
    console.log(modelName);
  }
}
