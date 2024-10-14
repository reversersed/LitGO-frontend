import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input('id') componentId!: string;
  @Input('disabled') disabled = false;
  @Input('error') errorMessage?: string | string[];
  @Input('value') inputValue!: string;
  @Input('label') labelValue?: string;
  @Input('type') inputType: 'text' | 'password' = 'text';
  @Input('autocomplete') autocomplete: string = 'on';
  @Output('valueChange')
  valueChange = new EventEmitter<string>();
  @Output('errorChange') errorChange = new EventEmitter<
    string[] | string | undefined
  >();
  @Output('submit') submitEvent = new EventEmitter();

  onInput(e: Event) {
    this.inputValue = (e.target as HTMLInputElement).value;
    this.valueChange.emit(this.inputValue);

    this.errorMessage = undefined;
    this.errorChange.emit(undefined);
  }

  isArray(value: string | string[] | undefined): value is string[] {
    return Array.isArray(value);
  }
}
