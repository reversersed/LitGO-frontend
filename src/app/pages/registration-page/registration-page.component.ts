import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { UserService } from '../../service/http/user.service';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import HttpError, { HttpCodes } from '../../models/httperror.model';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, InputComponent, CheckboxComponent, FontAwesomeModule],
  templateUrl: './registration-page.component.html',
})
export class RegistrationPageComponent {
  service = inject(UserService);
  router = inject(Router);

  faSpinner = faSpinner;
  form: {
    login: string;
    password: string;
    repeat: string;
    email: string;
    remember: boolean;
    loginError?: string[];
    passwordError?: string[];
    emailError?: string[];
    repeatError?: string;
    generalError?: string;
    attempting: boolean;
  } = {
    login: '',
    password: '',
    repeat: '',
    email: '',
    remember: false,
    attempting: false,
  };

  submit() {
    this.form.repeatError = undefined;
    this.form.loginError = undefined;
    this.form.emailError = undefined;
    this.form.generalError = undefined;
    this.form.passwordError = undefined;

    if (this.form.login.length === 0) {
      this.form.loginError = ['Введите логин'];
    }
    if (this.form.password.length === 0) {
      this.form.passwordError = ['Введите пароль'];
    }
    if (this.form.email.length === 0) {
      this.form.emailError = ['Введите почту'];
    }
    if (this.form.repeat !== this.form.password) {
      this.form.repeatError = 'Пароли должны совпадать';
    }
    if (
      this.form.repeatError !== undefined ||
      this.form.loginError !== undefined ||
      this.form.emailError !== undefined ||
      this.form.generalError !== undefined ||
      this.form.passwordError !== undefined
    ) {
      return;
    }
    this.form.attempting = true;

    this.service
      .Register(
        this.form.login,
        this.form.password,
        this.form.repeat,
        this.form.email,
        this.form.remember
      )
      .subscribe({
        next: () => {
          this.form.attempting = false;
          this.router.navigate(['']);
        },
        error: (err) => {
          this.form.attempting = false;
          let error = err as HttpError;
          
          switch (error.code) {
            case HttpCodes.Internal:
            case HttpCodes.Unavailable:
              this.form.generalError = 'Сервис недоступен. Попробуйте позже';
              break;
            case HttpCodes.AlreadyExist:
              error.details.map((d) => {
                switch (d.field) {
                  case 'login':
                    if (this.form.loginError === undefined)
                      this.form.loginError = ['Логин занят'];
                    else this.form.loginError.push('Логин занят');
                    break;
                  case 'email':
                    if (this.form.emailError === undefined)
                      this.form.emailError = ['Почта занята'];
                    else this.form.emailError.push('Почта занята');
                    break;
                }
              });
              break;
            case HttpCodes.InvalidArgument:
              error.details.map((d) => {
                switch (d.field) {
                  case 'login':
                    switch (d.tag) {
                      case 'min':
                        if (this.form.loginError === undefined)
                          this.form.loginError = [
                            'Логин должен быть не меньше ' +
                              d.tagValue +
                              ' символов',
                          ];
                        else
                          this.form.loginError.push(
                            'Логин должен быть не меньше ' +
                              d.tagValue +
                              ' символов'
                          );

                        break;
                      case 'max':
                        if (this.form.loginError === undefined)
                          this.form.loginError = [
                            'Логин должен быть не больше ' +
                              d.tagValue +
                              ' символов',
                          ];
                        else
                          this.form.loginError.push(
                            'Логин должен быть не больше ' +
                              d.tagValue +
                              ' символов'
                          );
                        break;
                      case 'onlyenglish':
                        if (this.form.loginError === undefined)
                          this.form.loginError = [
                            'В логине присутствуют запрещенные символы',
                          ];
                        else
                          this.form.loginError.push(
                            'В логине присутствуют запрещенные символы'
                          );
                        break;
                    }
                    break;
                  case 'password':
                    switch (d.tag) {
                      case 'min':
                        if (this.form.passwordError === undefined)
                          this.form.passwordError = [
                            'Пароль должен быть не меньше ' +
                              d.tagValue +
                              ' символов',
                          ];
                        else
                          this.form.passwordError.push(
                            'Пароль должен быть не меньше ' +
                              d.tagValue +
                              ' символов'
                          );
                        break;
                      case 'max':
                        if (this.form.passwordError === undefined)
                          this.form.passwordError = [
                            'Пароль должен быть не больше ' +
                              d.tagValue +
                              ' символов',
                          ];
                        else
                          this.form.passwordError.push(
                            'Пароль должен быть не больше ' +
                              d.tagValue +
                              ' символов'
                          );
                        break;
                      case 'lowercase':
                        if (this.form.passwordError === undefined)
                          this.form.passwordError = [
                            'Пароль должен содержать строчную букву',
                          ];
                        else
                          this.form.passwordError.push(
                            'Пароль должен содержать строчную букву'
                          );
                        break;
                      case 'uppercase':
                        if (this.form.passwordError === undefined)
                          this.form.passwordError = [
                            'Пароль должен содержать заглавную букву',
                          ];
                        else
                          this.form.passwordError.push(
                            'Пароль должен содержать заглавную букву'
                          );
                        break;
                      case 'digitrequired':
                        if (this.form.passwordError === undefined)
                          this.form.passwordError = [
                            'Пароль должен содержать цифру',
                          ];
                        else
                          this.form.passwordError.push(
                            'Пароль должен содержать цифру'
                          );
                        break;
                      case 'specialsymbol':
                        if (this.form.passwordError === undefined)
                          this.form.passwordError = [
                            'Пароль должен содержать специальный символ',
                          ];
                        else
                          this.form.passwordError.push(
                            'Пароль должен содержать специальный символ'
                          );
                        break;
                    }
                    break;
                  case 'email':
                    switch (d.tag) {
                      case 'email':
                        if (this.form.emailError === undefined)
                          this.form.emailError = ['Укажите валидную почту'];
                        else
                          this.form.emailError.push('Укажите валидную почту');
                        break;
                    }
                    break;
                }
              });
              break;
          }
        },
      });
  }
}
