import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-side-bar-menu',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss'],
})
export class SideBarMenuComponent {
  @Output() closeSidebar = new EventEmitter<void>();

  constructor(private readonly taskService: TaskService) {}

  showTasks(completed: boolean): void {
    this.taskService.showCompletedTasksFn(completed);
    this.closeSidebar.emit();
  }
}
