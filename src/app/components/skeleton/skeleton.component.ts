import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css',
})
export class SkeletonComponent {
  @Input() height!: string;
  @Input() width!: string;
  @Input() borderRadius!: string;
  @Input() class?: string;
}
