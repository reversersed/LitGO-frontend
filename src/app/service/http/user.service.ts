import { inject, Injectable, Signal, signal } from '@angular/core';
import { UserLoginModel } from '../../models/user.model';
import { catchError, EMPTY, first, map, Observable, of } from 'rxjs';
import {
  SharedEmpty,
  UserClient,
  UsersLoginRequest,
  UsersRegistrationRequest,
} from './gen/generated';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = signal<UserLoginModel | null>(null);
  private apiClient = inject(UserClient);

  public Auth(): Observable<UserLoginModel | null> {
    return this.apiClient.auth({} as SharedEmpty).pipe(
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
    return this.user.asReadonly();
  }

  public LogoutUser() {
    return this.apiClient.logout({} as SharedEmpty).pipe(
      first(),
      catchError(() => EMPTY),
      map(() => this.user.set(null))
    );
  }
  public Login(
    login: string,
    password: string,
    rememberMe: boolean
  ): Observable<UserLoginModel> {
    return this.apiClient
      .login({
        login: login,
        password: password,
        rememberMe: rememberMe,
      } as UsersLoginRequest)
      .pipe(
        first(),
        map((user) => {
          this.user.set(user as UserLoginModel);
          return user as UserLoginModel;
        })
      );
  }
  public Register(
    login: string,
    password: string,
    repeat: string,
    email: string,
    rememberMe: boolean
  ): Observable<UserLoginModel> {
    return this.apiClient
      .registerUser({
        login: login,
        password: password,
        passwordRepeat: repeat,
        email: email,
        rememberMe: rememberMe,
      } as UsersRegistrationRequest)
      .pipe(
        first(),
        map((user) => {
          this.user.set(user as UserLoginModel);
          return user as UserLoginModel;
        })
      );
  }
}
