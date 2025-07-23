import { Component } from '@angular/core';

import { HeaderComponent } from '../../organisms/header/header.component';
import { TaskComponent } from '../../organisms/task/task.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [HeaderComponent, TaskComponent],
  templateUrl: './todo-page.component.html',
})
export class ToDoPageComponent {
  constructor() {}
}
