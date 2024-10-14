import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import GenericService from './generic.service';
import { UserLoginModel } from '../../models/user.model';
import { catchError, EMPTY, first, map, of } from 'rxjs';
import HttpError from '../../models/httperror.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService {
  private user = signal<UserLoginModel | null>(null);

  constructor(private http: HttpClient) {
    super('users');
  }
  public Auth() {
    return this.http
      .get(this.buildPath('auth'), {
        headers: this.getHeaders(),
      })
      .pipe(
        first(),
        catchError(() => {
          this.user.set(null);
          return of(null);
        }),
        map((user) => {
          this.user.set(user as UserLoginModel);
          return this.user();
        })
      );
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
      .post<UserLoginModel>(
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
  public Register(
    login: string,
    password: string,
    repeat: string,
    email: string,
    rememberMe: boolean
  ) {
    return this.http
      .post<UserLoginModel>(
        this.buildPath('signin'),
        {
          login: login,
          password: password,
          password_repeat: repeat,
          email: email,
          rememberMe: rememberMe,
        },
        { headers: this.getHeaders() }
      )
      .pipe(
        first(),
        map((user) => {
          this.user.set(user);
          return user;
        })
      );
  }
}
