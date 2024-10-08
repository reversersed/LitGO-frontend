import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  faClose = faClose;
  faSpinner = faSpinner;
  @Input() disabled: boolean = false;
  @Input() visible!: boolean;
  @Input() ok!: string; // Text represents ok button
  @Input() danger: boolean = false; // Marks that modal action is dangerous
  @Input() title!: string;
  @Input() background = true;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter();
  ChangeModalState(state: boolean) {
    this.visible = state;
    this.visibleChange.emit(this.visible);
  }
}
