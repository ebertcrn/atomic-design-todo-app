import { Component } from '@angular/core';

import { TaskComponent } from './shared/components/organisms/task/task.component';
import { HeaderComponent } from './shared/components/molecules/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}
