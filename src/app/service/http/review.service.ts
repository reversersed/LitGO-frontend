import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Review from '../../models/review.model';
import { ReviewsUserActionEnum } from './gen/generated';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  createReview(text: string, rating: number): Observable<Review> {
    return of({} as Review);
  }
  deleteReview(reviewId: string): Observable<string> {
    return of(reviewId);
  }
  sendReviewReply(reviewId: string, text: string): Observable<Review> {
    return of({
      id: '123',
      author: { login: 'a1' },
      text: 'Это т',
      rating: 5,
      likes: 2,
      dislikes: 55332,
      currentUserAction: ReviewsUserActionEnum.NoAction,
      date: new Date(),
      replies: [
        {
          id: '123ds',
          date: new Date(),
          author: { login: 'admin' },
          likes: 0,
          dislikes: 0,
          text: text,
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
      ],
    } as Review);
  }
  changeReviewReplyAction(
    reviewId: string,
    replyId: string,
    action: ReviewsUserActionEnum
  ): Observable<Review> {
    return of({
      id: '123',
      author: { login: 'a1' },
      text: 'Это т',
      rating: 5,
      likes: 2,
      dislikes: 55332,
      currentUserAction: ReviewsUserActionEnum.Like,
      date: new Date(),
      replies: [
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: action,
        },
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
      ],
    } as Review);
  }
  changeReviewAction(
    reviewId: string,
    action: ReviewsUserActionEnum
  ): Observable<Review> {
    return of({
      id: '123',
      author: { login: 'a1' },
      text: 'Это т',
      rating: 5,
      likes: 2,
      dislikes: 55332,
      currentUserAction: action,
      date: new Date(),
      replies: [
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
        {
          id: '123',
          date: new Date(),
          author: { login: 'dssads' },
          likes: 2,
          dislikes: 3,
          text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
          currentUserAction: ReviewsUserActionEnum.NoAction,
        },
      ],
    } as Review);
  }
  getCurrentUserBookReview(bookName: string): Observable<Review | undefined> {
    return of(undefined);
  }
  getBookReviews(
    bookName: string,
    count: number,
    offset: number,
    sort: 'liked' | 'disliked' | 'new' | 'old'
  ): Observable<Review[]> {
    const array = [
      {
        id: '123',
        author: { login: 'a1' },
        text: 'Это т',
        rating: 5,
        likes: 2,
        dislikes: 55332,
        currentUserAction: ReviewsUserActionEnum.Like,
        date: new Date(),
        replies: [
          {
            id: '123',
            date: new Date(),
            author: { login: 'dssads' },
            likes: 2,
            dislikes: 3,
            text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
            currentUserAction: ReviewsUserActionEnum.NoAction,
          },
          {
            id: '123',
            date: new Date(),
            author: { login: 'dssads' },
            likes: 2,
            dislikes: 3,
            text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
            currentUserAction: ReviewsUserActionEnum.NoAction,
          },
          {
            id: '123',
            date: new Date(),
            author: { login: 'dssads' },
            likes: 2,
            dislikes: 3,
            text: 'ттывпвптввапр апррапраптарптпа рап ррапраптвпивпаипвыап ывыуап  ыап ывап',
            currentUserAction: ReviewsUserActionEnum.NoAction,
          },
        ],
      },
    ] as Review[];

    return of(array.slice(offset, offset + count));
  }
}
