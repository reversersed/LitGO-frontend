import {
  HttpResponse as HR,
  HttpResponseBase as HRB,
  HttpErrorResponse as HER,
} from '@angular/common/http';
import { Observable as Obs, of, of as OfObservable } from 'rxjs';

export class BaseClient {
  protected transformOptions(opt: any): Obs<any> {
    return OfObservable(opt);
  }
  protected transformResult(
    url: string,
    response: HRB,
    processor: (response: HRB) => Obs<any>
  ): Obs<any> {
    if (response instanceof HER) {
      return processor(response);
    }
    return processor(response);
  }
}
