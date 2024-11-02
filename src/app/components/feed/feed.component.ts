import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './feed.component.html',
  styles: ``,
})
export class FeedComponent {
  corner: 'none' | 'both' | 'left' | 'right' = 'left';
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  @ViewChild('wrapper')
  wrapper!: ElementRef<HTMLDivElement>;

  onScroll() {
    this.corner = 'none';
    if (
      this.wrapper.nativeElement.scrollLeft +
        this.wrapper.nativeElement.clientWidth >=
      this.wrapper.nativeElement.scrollWidth - 50
    )
      this.corner = 'right';

    if (this.wrapper.nativeElement.scrollLeft == 0 && this.corner == 'right')
      this.corner = 'both';
    else if (this.wrapper.nativeElement.scrollLeft == 0) this.corner = 'left';
  }
  scroll(direction: 'left' | 'right') {
    this.wrapper.nativeElement.scrollBy({
      left: direction == 'right' ? 180 : -180,
      behavior: 'smooth',
    });
  }
}
