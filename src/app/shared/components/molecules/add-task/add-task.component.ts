import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task.model';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  get taskControl(): FormControl<string> {
    return this.taskForm.get('task') as FormControl<string>;
  }

  addTask(): void {
    const newTask: TaskModel = {
      name: this.taskControl.value,
      isCompleted: false,
      id: crypto.randomUUID(),
    };

    this.taskService.addTask(newTask);
    this.updateTasksInStorage();
    this.taskControl.reset();
  }

  private updateTasksInStorage(): void {
    this.storageService.setItem('tasks', this.taskService.getTasks());
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      task: new FormControl<string>(''),
    });
  }
}
