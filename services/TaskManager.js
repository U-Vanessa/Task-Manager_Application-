import { readTasks, writeTasks } from '../utils/fileHandler.js';
import Task from '../models/Task.js';
import { v4 as uuidv4 } from 'uuid';

class TaskManager {
  constructor() {
    this.tasks = readTasks();
  }

  addTask(title, description, dueDate, priority) {
    const newTask = new Task(uuidv4(), title, description, dueDate, 'pending', priority);
    this.tasks.push(newTask);
    writeTasks(this.tasks);
    return newTask;
  }

  listTasks() {
    return this.tasks;
  }

  updateTask(id, updatedFields) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;

    Object.assign(task, updatedFields);
    writeTasks(this.tasks);
    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    writeTasks(this.tasks);
    return true;
  }
}

export default TaskManager;
