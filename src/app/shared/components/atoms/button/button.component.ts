import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { ButtonTypeEnum, IconsEnum } from './button.enum';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input({ required: true }) type!: ButtonTypeEnum;
  @Input() icon?: IconsEnum;
  @Input() label?: string;
  @Input() isDisabled = false;

  @Output() onClickButton = new EventEmitter<void>();

  buttonType = ButtonTypeEnum;

  constructor() {}

  onClick(): void {
    this.onClickButton.emit();
  }
}
