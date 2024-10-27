import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-to-up-overlay',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './to-up-overlay.component.html',
  styles: ``,
})
export class ToUpOverlayComponent {
  faArrow = faArrowUp;
  visibility = false;

  ScrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  @HostListener('window:scroll', [])
  ScrollListener() {
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    if (pos >= document.documentElement.clientHeight) this.visibility = true;
    else this.visibility = false;
  }
}
