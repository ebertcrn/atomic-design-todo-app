import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { StorageService } from '../../../services/storage.service';
import { CheckboxComponent } from '../../atoms/checkbox/checkbox.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  taskList: TaskModel[] = [];

  constructor(
    private readonly taskService: TaskService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initializeSubscription();
  }

  completeTask(taskId: string): void {
    this.taskService.getTasks().map((task) => {
      if (task.id === taskId) {
        task.isCompleted = true;
      }
    });
  }

  private get storedTasks(): TaskModel[] | null {
    return this.storageService.getItem('tasks');
  }

  private initializeSubscription(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      if (this.storedTasks && this.storedTasks.length > 0) {
        this.taskList = this.storedTasks
          .map((task) => {
            if (!task.isCompleted) {
              return task;
            }
            return undefined;
          })
          .filter((task) => task !== undefined);
        // tenho que prevenir que tasks com isCompleted true sejam adicionadas `a lista.
        // a lista taskList deve conter apenas tarefas pendentes.
      }

      this.taskList.push(...tasks);
    });
  }
}
