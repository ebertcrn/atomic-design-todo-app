import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.tasks.asObservable();

  private showCompletedTasks = new BehaviorSubject<boolean>(false);
  showCompletedTasks$ = this.showCompletedTasks.asObservable();

  constructor() {}

  addTask(task: TaskModel): void {
    this.tasks.next([...this.getTasks(), task]);
  }

  getTasks(): TaskModel[] {
    return this.tasks.value;
  }

  completeTask(taskId: string): void {
    const updatedTasks = this.getTasks().map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: true };
      }
      return task;
    });
    this.tasks.next(updatedTasks);
  }

  updateTaskName(taskId: string, newName: string): void {
    const updatedTasks: TaskModel[] = this.getTasks().map((task) => {
      return task.id === taskId ? { ...task, name: newName } : task;
    });

    this.tasks.next(updatedTasks);
  }

  showCompletedTasksFn(show: boolean): void {
    this.showCompletedTasks.next(show);
  }
}
