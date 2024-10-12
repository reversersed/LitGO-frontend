import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import GenericService from './generic.service';
import { UserLoginModel } from '../../models/user.model';
import { catchError, EMPTY, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService {
  private user = signal<UserLoginModel | null>(null);

  constructor(private http: HttpClient) {
    super('users');

    http
      .get(this.buildPath('auth'), {
        headers: this.getHeaders(),
      })
      .pipe(
        first(),
        catchError(() => {
          this.user.set(null);
          return EMPTY;
        }),
        map((user) => this.user.set(user as UserLoginModel))
      )
      .subscribe();
  }

  public CurrentUser(): Signal<UserLoginModel | null> {
    return this.user;
  }

  public LogoutUser() {
    return this.http
      .post(this.buildPath('logout'), {
        headers: this.getHeaders(),
      })
      .pipe(
        first(),
        catchError(() => EMPTY),
        map(() => this.user.set(null))
      );
  }
  public Login(login: string, password: string, rememberMe: boolean) {
    return this.http
      .post(
        this.buildPath('login'),
        {
          login: login,
          password: password,
          rememberMe: rememberMe,
        },
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        first(),
        map((user) => {
          this.user.set(user as UserLoginModel);
          return user;
        })
      );
  }
}
