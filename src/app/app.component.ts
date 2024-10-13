import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/http/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {}
}
