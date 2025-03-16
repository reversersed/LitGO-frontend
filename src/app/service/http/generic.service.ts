import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export default abstract class GenericService {
  private path: string;
  constructor(path: string) {
    this.path = path;
  }

  protected buildPath(route?: string): string {
    let server =
      (environment.serverString.length > 0 ? environment.serverString : '') +
      '/' +
      environment.serverEntryPoint +
      '/' +
      this.path +
      (route !== undefined ? '/' + route : '');

    return server;
  }
}
