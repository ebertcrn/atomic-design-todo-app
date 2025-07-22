import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TaskService } from '../../../services/task.service';
import { StorageService } from '../../../services/storage.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { TaskModel } from '../../../models/task.model';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ButtonTypeEnum, IconsEnum } from '../../atoms/button/button.enum';

@Component({
  selector: 'app-task-item-edit',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './task-item-edit.component.html',
  styleUrls: ['./task-item-edit.component.scss'],
})
export class TaskItemEditComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) task!: TaskModel;

  @Output() onCancelEdit = new EventEmitter<void>();

  readonly buttonType = ButtonTypeEnum.MiniFab;
  readonly saveButtonIcon = IconsEnum.Check;
  readonly cancelButtonIcon = IconsEnum.Close;

  constructor(
    private readonly taskService: TaskService,
    private readonly storageService: StorageService,
    private readonly snackbarService: SnackbarService
  ) {}

  get editingTaskCtrl(): FormControl<string> {
    return this.form.get('editingTask') as FormControl<string>;
  }

  saveTaskEdit(task: TaskModel): void {
    this.taskService.updateTaskName(task.id, this.editingTaskCtrl.value);
    this.storageService.setItem('tasks', this.taskService.getTasks());
    this.snackbarService.open('Task updated!');
  }

  cancelEdit(): void {
    this.onCancelEdit.emit();
  }
}
