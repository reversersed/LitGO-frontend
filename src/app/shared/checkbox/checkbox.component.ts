import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input('label') labelValue?: string;
  @Input('disabled') disabled = false;
  @Input('componentId') id!: string;
  @Input('checked') value: boolean = false;
  @Output('checkedChange') valueEvent = new EventEmitter<boolean>();

  changeValue(e: Event) {
    this.value = (e.target as HTMLInputElement).checked;
    this.valueEvent.emit(this.value);
  }
}
