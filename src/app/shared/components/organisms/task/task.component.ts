import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TaskListComponent } from '../../molecules/task-list/task-list.component';
import { AddTaskComponent } from '../../molecules/add-task/add-task.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskListComponent, AddTaskComponent, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      newTask: new FormControl<string>('', Validators.required),
      editingTask: new FormControl<string>('', Validators.required),
    });
  }
}
