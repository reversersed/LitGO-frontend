import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor() {
    this.year = new Date().getFullYear();
  }
  year: number;
}
