import User from './user.model';

export class ReviewReply {
  public id!: string;
  public created!: number;
  public creator!: User;
  public text!: string;
}
export default class Review {
  public id!: string;
  public creator!: User;
  public text!: string;
  public rating!: number;
  public created!: number;
  public replies!: ReviewReply[];
}
