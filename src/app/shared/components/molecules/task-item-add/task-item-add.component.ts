import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TaskService } from '../../../services/task.service';
import { TaskModel } from '../../../models/task.model';
import { StorageService } from '../../../services/storage.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ButtonTypeEnum, IconsEnum } from '../../atoms/button/button.enum';

@Component({
  selector: 'app-task-item-add',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './task-item-add.component.html',
  styleUrls: ['./task-item-add.component.scss'],
})
export class TaskItemAddComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;

  buttonLabel: string | undefined = undefined;
  buttonType: ButtonTypeEnum = ButtonTypeEnum.Flat;

  readonly buttonIcon = IconsEnum.Add;
  readonly inputLabel = 'New task';
  private resizeListener = () => this.updateButtonConfiguration();

  constructor(
    private readonly taskService: TaskService,
    private readonly storageService: StorageService,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.updateButtonConfiguration();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  private updateButtonConfiguration(): void {
    this.buttonType =
      window.innerWidth <= 767 ? ButtonTypeEnum.MiniFab : ButtonTypeEnum.Flat;
    this.buttonLabel = window.innerWidth <= 767 ? undefined : 'Add';
  }

  get taskControl(): FormControl<string> {
    return this.form.get('newTask') as FormControl<string>;
  }

  addTask(): void {
    if (!this.taskControl.value) {
      return;
    }

    const newTask: TaskModel = {
      name: this.taskControl.value,
      isCompleted: false,
      id: crypto.randomUUID(),
    };

    this.taskService.addTask(newTask);
    this.updateTasksInStorage();
    this.taskControl.reset();
    this.snackbarService.open('Task added!');
  }

  private updateTasksInStorage(): void {
    this.storageService.setItem('tasks', this.taskService.getTasks());
  }
}
