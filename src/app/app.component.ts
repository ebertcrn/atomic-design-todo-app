import { Component } from '@angular/core';

import { AddTaskComponent } from './shared/components/molecules/add-task/add-task.component';
import { TaskListComponent } from './shared/components/molecules/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddTaskComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}
