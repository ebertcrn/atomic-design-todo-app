import { Component, EventEmitter, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Output() onCheckChange = new EventEmitter<void>();

  constructor() {}

  onCheck(): void {
    this.onCheckChange.emit();
  }
}
