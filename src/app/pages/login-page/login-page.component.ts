import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../service/http/user.service';
import { CheckboxComponent } from '../../shared/checkbox/checkbox.component';
import { CatalogueComponent } from '../../components/header/catalogue/catalogue.component';
import HttpError, { HttpCodes } from '../../models/httperror.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    FontAwesomeModule,
    CheckboxComponent,
    CatalogueComponent,
  ],
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  service = inject(UserService);
  router = inject(Router);
  faSpinner = faSpinner;
  attempingState = false;

  form: {
    login: string;
    password: string;
    rememberMe: boolean;
    loginError?: string;
    passwordError?: string;
    generalError?: string;
  } = {
    login: '',
    password: '',
    rememberMe: false,
  };

  submit() {
    this.form.generalError = undefined;
    this.form.loginError = undefined;
    this.form.passwordError = undefined;
    if (this.form.login.length == 0) {
      this.form.loginError = 'Введите логин или почту';
    }
    if (this.form.password.length == 0) {
      this.form.passwordError = 'Введите пароль';
    }

    if (
      this.form.passwordError != undefined ||
      this.form.loginError != undefined
    )
      return;
    this.attempingState = true;
    this.service
      .Login(this.form.login, this.form.password, this.form.rememberMe)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err) => {
          this.attempingState = false;
          let error = err as HttpError;

          if (
            error.code == HttpCodes.Unavailable ||
            error.code == HttpCodes.Internal
          ) {
            this.form.generalError = 'Сервис недоступен. Попробуйте позже';
            return;
          }
          this.form.generalError = 'Неправильный логин или пароль';
          this.form.loginError = '';
          this.form.passwordError = '';
        },
      });
  }
}
