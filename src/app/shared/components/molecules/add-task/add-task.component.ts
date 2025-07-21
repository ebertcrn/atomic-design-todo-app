import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task.model';
import { StorageService } from '../../../services/storage.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Input({ required: true }) form!: FormGroup;

  readonly label = 'New task';

  constructor(
    private readonly taskService: TaskService,
    private readonly storageService: StorageService,
    private readonly snackbarService: SnackbarService
  ) {}

  get taskControl(): FormControl<string> {
    return this.form.get('newTask') as FormControl<string>;
  }

  addTask(): void {
    if (this.taskControl.invalid) {
      return;
    }

    const newTask: TaskModel = {
      name: this.taskControl.value,
      isCompleted: false,
      id: crypto.randomUUID(),
    };

    this.taskService.addTask(newTask);
    this.updateTasksInStorage();
    this.taskControl.reset();
    this.snackbarService.open('Task added');
  }

  private updateTasksInStorage(): void {
    this.storageService.setItem('tasks', this.taskService.getTasks());
  }
}
