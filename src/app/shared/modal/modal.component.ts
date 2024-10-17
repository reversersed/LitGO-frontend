import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ScrollMutexService } from '../../service/scroll-mutex.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterLink],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges, OnDestroy {
  scrollService = inject(ScrollMutexService);
  faClose = faClose;
  faSpinner = faSpinner;
  @Input() disabled: boolean = false;
  @Input() visible!: boolean;
  @Input() ok!: string; // Text represents ok button
  @Input() danger: boolean = false; // Marks that modal action is dangerous
  @Input() title!: string;
  @Input() background = true;
  @Input('footer') footerComponent?: {
    text: string;
    linkText?: string;
    link?: string;
  };
  @Input('error')
  errorValue?: string;
  @Output()
  visibleChange = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter();

  lockedBy = false;
  ChangeModalState(state: boolean) {
    this.visible = state;
    this.visibleChange.emit(this.visible);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      if (changes['visible'].currentValue == true) {
        if (!this.scrollService.isLocked()) {
          this.scrollService.Lock();
          this.lockedBy = true;
        }
      } else {
        if (this.lockedBy) {
          this.scrollService.Unlock();
          this.lockedBy = false;
        }
      }
    }
  }
  ngOnDestroy(): void {
    if (this.lockedBy) this.scrollService.Unlock();
  }
}
