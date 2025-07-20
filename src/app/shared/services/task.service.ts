import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor() {}

  addTask(task: TaskModel): void {
    this.tasks.next([...this.getTasks(), task]);
  }

  getTasks(): TaskModel[] {
    return this.tasks.value;
  }
}
