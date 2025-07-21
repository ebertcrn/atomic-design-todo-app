import { Component } from '@angular/core';

import { AddTaskComponent } from './shared/components/molecules/add-task/add-task.component';
import { TaskListComponent } from './shared/components/molecules/task-list/task-list.component';
import { TaskComponent } from './shared/components/organisms/task/task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddTaskComponent, TaskListComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}
