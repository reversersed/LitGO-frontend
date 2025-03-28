import { Observable as Obs, of as OfObservable } from 'rxjs';

export class BaseClient {
  protected transformOptions(opt: any): Obs<any> {
    opt.responseType = 'json';
    return OfObservable(opt);
  }
}
