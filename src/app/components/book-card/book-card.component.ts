import {
  Component,
  ElementRef,
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

  @ViewChild('image') image?: ElementRef;
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.image === undefined || this.animationStyle !== 'observe') return;

    const rect = this.image.nativeElement.getBoundingClientRect();
    const centerX = rect.left + this.image.nativeElement.width / 2;
    const centerY = rect.top + this.image.nativeElement.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const sensitivity = 60;
    this.rotationY = (deltaX / rect.width) * sensitivity;
    this.rotationX = -(deltaY / rect.height) * sensitivity;
    this.rotationX = Math.max(-30, Math.min(30, this.rotationX));
    this.rotationY = Math.max(-30, Math.min(30, this.rotationY));
  }
  getRotationStyle() {
    if (!this.hover) return 'rotateX(0deg) rotateY(0deg)';
    return (
      'rotateX(' +
      this.rotationX +
      'deg) rotateY(' +
      this.rotationY +
      'deg) scale(1.1)'
    );
  }
}
