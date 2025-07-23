import { Component } from '@angular/core';

import { ToDoPageComponent } from './shared/components/pages/todo-page/todo-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToDoPageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
