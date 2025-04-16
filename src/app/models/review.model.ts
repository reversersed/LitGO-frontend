import { ReviewsUserActionEnum } from '../service/http/gen/generated';
import User from './user.model';

export class ReviewReply {
  public id!: string;
  public date!: Date;
  public author!: User;
  public likes!: number;
  public text!: string;
  public dislikes!: number;
  public currentUserAction!: ReviewsUserActionEnum;
}
export default class Review {
  public id!: string;
  public author!: User;
  public text!: string;
  public rating!: number;
  public date!: Date;
  public likes!: number;
  public dislikes!: number;
  public currentUserAction!: ReviewsUserActionEnum;
  public replies!: ReviewReply[];
}
