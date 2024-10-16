import {
  Component,
  HostListener,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import Book from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FileService } from '../../service/file.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './book-card.component.html',
})
export class BookCardComponent {
  @Input('model') bookModel!: Book;
  @Input('animation') animationStyle: 'none' | 'scale' | 'observe' = 'none';
  @Input('align') alignMode: 'auto' | 'row' | 'col' = 'auto';

  fileService = inject(FileService);
  faStar = faStar;

  hover: boolean = false;

  rotationX: number = 0;
  rotationY: number = 0;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const sensitivity = 50;
    this.rotationY = (deltaX / rect.width) * sensitivity;
    this.rotationX = -(deltaY / rect.height) * sensitivity;
    this.rotationX = Math.max(-20, Math.min(20, this.rotationX));
    this.rotationY = Math.max(-20, Math.min(20, this.rotationY));
  }
  getRotationStyle() {
    if (!this.hover) return 'rotateX(0deg) rotateY(0deg)';
    return (
      'rotateX(' + this.rotationX + 'deg) rotateY(' + this.rotationY + 'deg)'
    );
  }
}
