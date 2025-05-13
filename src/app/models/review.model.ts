import User from './user.model';

export class ReviewReply {
  public id!: string;
  public date!: Date;
  public author!: User;
  public text!: string;
}
export default class Review {
  public id!: string;
  public author!: User;
  public text!: string;
  public rating!: number;
  public date!: Date;
  public replies!: ReviewReply[];
}
