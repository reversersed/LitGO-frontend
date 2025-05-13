import { inject, Injectable } from '@angular/core';
import { catchError, first, map, Observable, of } from 'rxjs';
import Review from '../../models/review.model';
import {
  ReviewClient,
  ReviewCreateReviewReplyBody,
  ReviewsCreateBookReviewRequest,
} from './gen/generated';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  apiClient = inject(ReviewClient);

  createReview(
    bookId: string,
    text: string,
    rating: number
  ): Observable<Review> {
    return this.apiClient
      .createBookReview({
        text: text,
        rating: rating,
        bookId: bookId,
      } as ReviewsCreateBookReviewRequest)
      .pipe(
        first(),
        map((e, v) => e.review as unknown as Review)
      );
  }
  deleteReview(bookId: string, reviewId: string): Observable<string> {
    return this.apiClient.deleteBookReview(bookId, reviewId).pipe(
      first(),
      map((e, v) => e.deletedId ?? '')
    );
  }
  sendReviewReply(
    bookId: string,
    reviewId: string,
    text: string
  ): Observable<Review> {
    return this.apiClient
      .createReviewReply(bookId, reviewId, {
        text: text,
      } as ReviewCreateReviewReplyBody)
      .pipe(
        first(),
        map((e, v) => e.review as unknown as Review)
      );
  }
  getCurrentUserBookReview(bookId: string): Observable<Review | undefined> {
    return this.apiClient.getCurrentUserBookReview(bookId).pipe(
      first(),
      catchError((e) => of(undefined)),
      map((e) => e?.review as Review | undefined)
    );
  }
  getBookReviews(
    bookId: string,
    count: number,
    offset: number,
    sort: 'new' | 'old'
  ): Observable<Review[]> {
    return this.apiClient
      .getBookReviews(bookId, count * offset, count, sort)
      .pipe(
        first(),
        map((e, v) => (e.reviews ?? ([] as Review[])) as Review[])
      );
  }
}
