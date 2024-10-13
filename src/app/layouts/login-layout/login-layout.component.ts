import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './login-layout.component.html',
  styles: ``,
})
export class LoginLayoutComponent {}
