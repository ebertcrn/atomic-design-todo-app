import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TaskModel } from '../../../models/task.model';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';
import { StorageService } from '../../../services/storage.service';
import { TaskService } from '../../../services/task.service';
import { TaskItemEditComponent } from '../task-item-edit/task-item-edit.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CheckboxComponent,
    TaskItemEditComponent,
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input({ required: true }) task!: TaskModel;
  @Input({ required: true }) form!: FormGroup;

  editingTaskId: string | null = null;

  constructor(
    private readonly storageService: StorageService,
    private readonly taskService: TaskService
  ) {}

  get editingTaskCtrl(): FormControl<string> {
    return this.form.get('editingTask') as FormControl<string>;
  }

  completeTask(taskId: string): void {
    setTimeout(() => {
      this.taskService.completeTask(taskId);
      this.updateStorage();
    }, 1000);
  }

  openTaskEdit(task: TaskModel): void {
    this.editingTaskId = task.id;
    this.editingTaskCtrl.setValue(task.name);
  }

  cancelEdit(): void {
    this.editingTaskId = null;
  }

  private updateStorage(): void {
    this.storageService.setItem('tasks', this.taskService.getTasks());
  }
}
