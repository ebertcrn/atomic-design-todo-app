import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SideBarMenuComponent } from '../../molecules/side-bar-menu/side-bar-menu.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, SideBarMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('overlayFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('250ms ease', style({ opacity: 0 }))]),
    ]),
    trigger('sidebarSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(
          '300ms cubic-bezier(.4,0,.2,1)',
          style({ transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms cubic-bezier(.4,0,.2,1)',
          style({ transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  sidebarOpen = false;
  isDesktop = window.innerWidth >= 1024;

  private resizeListener = () => {
    this.isDesktop = window.innerWidth >= 1024;
  };

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.resizeListener);
    this.isDesktop = window.innerWidth >= 1024;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  openMenu(): void {
    this.sidebarOpen = true;
  }

  closeMenu(): void {
    this.sidebarOpen = false;
  }

  showTasks(completed: boolean): void {
    this.taskService.showCompletedTasksFn(completed);
  }
}
