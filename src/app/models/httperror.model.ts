export interface HttpErrorDetail {
  field?: string;
  struct?: string;
  tag?: string;
  tagValue?: string;
  description?: string;
  actualvalue?: string;
}
export enum HttpCodes {
  Ok = 0,
  Canceled = 1,
  Unknown = 2,
  InvalidArgument = 3,
  DeadlineExceeded = 4,
  NotFound = 5,
  AlreadyExist = 6,
  PermissionDenied = 7,
  ResourceExhausted = 8,
  FailedPrecondition = 9,
  Aborted = 10,
  OutOfRange = 11,
  Unimplemented = 12,
  Internal = 13,
  Unavailable = 14,
  DataLoss = 15,
  Unauthenticated = 16,
}
export default interface HttpError {
  details: HttpErrorDetail[];
  code: number;
  message: string;
  type: string;
}
export function createNullError(): HttpError {
  return {
    details: [],
    code: 500,
    message: 'server not responding',
    type: 'InternalServerError',
  };
}
export function isHttpError(object: any): boolean {
  return (object as HttpError).details !== undefined;
}
