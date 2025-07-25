# Task-Manager_Application

##  Project Overview

The **Task Manager CLI Application** is a command-line tool developed using **Node.js** with a strong emphasis on **Object-Oriented Programming (OOP)** principles and file management. The application allows users to manage their tasks directly from the terminal—supporting operations like adding, viewing, updating, and deleting tasks, with persistent storage in a local JSON file.

---

##  Problem Statement

Many people struggle to stay organized without a digital tool, and not everyone wants or needs a complex web or mobile app. Our CLI-based Task Manager provides a simple, effective way to manage tasks directly from the terminal, ideal for developers or tech-savvy users working in terminal-based environments.

---

##  Technologies Used

- **Node.js**  
- **JavaScript (ES6+)**
- **File System (fs module)**
- **Inquirer (for CLI interaction)**
- **Chalk (for colored terminal output)**
- **Object-Oriented Programming (OOP)**

---

##  Features

- Add a new task with a title and description.
- View all existing tasks.
- Update task details (title, description, or status).
- Delete a task by ID.
- Persist task data using the filesystem (JSON file).
- Clean, modular, and OOP-compliant codebase.
- User-friendly command-line interface.

---

##  System Architecture

The application follows a layered OOP design with the following key components:

###  Class Design

- **Task**
  - Attributes: id, title, description, status
  - Methods: toggleStatus()

- **TaskManager**
  - Attributes: tasks[]
  - Methods: addTask(), getTasks(), updateTask(), deleteTask(), saveTasksToFile(), loadTasksFromFile()

###  File Structure

task-manager/
│
├── docs/                    
│   ├── project-proposal.pdf
│   ├── software-documentation.pdf
│   ├── UML/
│   │   ├── class-diagram.png
│   │   └── use-case-diagram.png
│   └── individual-reports/
│       ├── member1-report.pdf
│       └── member2-report.pdf
│
├── src/                     
│   ├── models/              
│   │   ├── Task.js
│   │   └── TaskManager.js
│   │
│   ├── services/            
│   │   └── FileService.js
│   │
│   ├── utils/                
│   │   └── helpers.js
│   │
│   ├── cli/                
│   │   └── app.js
│   │
│   └── data/                
│       └── tasks.json
│
├── tests/                   
│   └── Task.test.js
│
├── .gitignore               
├── package.json             
├── README.md                


---

##  Setup and Usage

### Prerequisites
- Node.js installed
- Terminal or command-line access

### Installation

```bash
git clone https://github.com/U-Vanessa/Task-Manager_Application-.git
cd task-manager-cli
npm install
```

### Running the App
``` bash
node src/app.js
```

### Sample Task Format (tasks.json)
[
  {
    "id": 1,

    "title": "Complete assignment",

    "description": "Finish writing the report",

    "status": "pending"

  }
]

### Testing & Error Handling
- Input validation is applied at every step.

- All operations are wrapped with try-catch for stability.

- Tasks persist between sessions via tasks.json.
