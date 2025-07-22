import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TaskListComponent } from '../../molecules/task-list/task-list.component';
import { TaskItemAddComponent } from '../../molecules/task-item-add/task-item-add.component';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { StorageService } from '../../../services/storage.service';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    TaskListComponent,
    TaskItemAddComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskList: TaskModel[] = [];
  completedTaskList: TaskModel[] = [];
  showCompletedTasks: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.checkStorageForTasks();
    this.initializeSubscription();
    this.initializeForm();
  }

  private get storedTasks(): TaskModel[] | null {
    return this.storageService.getItem('tasks');
  }

  private checkStorageForTasks(): void {
    const stored = this.storedTasks;
    if (stored && stored.length > 0) {
      for (const task of stored) {
        this.taskService.addTask(task);
      }
    }
  }

  private initializeSubscription(): void {
    combineLatest([
      this.taskService.showCompletedTasks$,
      this.taskService.tasks$,
    ]).subscribe(([showCompleted, tasks]) => {
      this.showCompletedTasks = showCompleted;
      this.taskList = tasks.filter((task) => !task.isCompleted);
      this.completedTaskList = tasks.filter((task) => task.isCompleted);
      console.log(this.completedTaskList);
    });
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      newTask: new FormControl<string>('', Validators.required),
      editingTask: new FormControl<string>('', Validators.required),
    });
  }
}
