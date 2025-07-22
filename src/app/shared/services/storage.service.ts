import { Injectable } from '@angular/core';

import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  setItem(key: string, value: TaskModel[]): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): TaskModel[] | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
