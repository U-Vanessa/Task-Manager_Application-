class Task {
  constructor(id, title, description, dueDate, status = 'pending', priority = 'normal') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
    this.priority = priority;
  }
}

export default Task;
