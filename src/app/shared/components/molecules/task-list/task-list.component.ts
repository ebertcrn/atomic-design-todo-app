import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { StorageService } from '../../../services/storage.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;

  taskList: TaskModel[] = [];

  constructor(
    private readonly taskService: TaskService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.checkStorageForTasks();
    this.initializeSubscription();
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
    this.taskService.tasks$.subscribe((tasks) => {
      this.taskList = tasks.filter((task) => !task.isCompleted);
      // this.updateStorage(); // talvez usar um viewChild
      console.log('Task list updated:', this.taskList);
    });
  }
}
