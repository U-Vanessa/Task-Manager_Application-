import inquirer from 'inquirer';
import TaskManager from './services/TaskManager.js'; // note the `.js` extension

const manager = new TaskManager();

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Select an action:',
      choices: ['Add Task', 'View Tasks', 'Update Task', 'Delete Task', 'Exit']
    }
  ]);

  switch (action) {
    case 'Add Task': {
      const taskDetails = await inquirer.prompt([
        { name: 'title', message: 'Task Title:' },
        { name: 'description', message: 'Description:' },
        { name: 'dueDate', message: 'Due Date (YYYY-MM-DD):' },
        {
          name: 'priority',
          type: 'list',
          choices: ['low', 'normal', 'high'],
          message: 'Priority level:'
        }
      ]);

      manager.addTask(
        taskDetails.title,
        taskDetails.description,
        taskDetails.dueDate,
        taskDetails.priority
      );
      console.log('✅ Task added!');
      break;
    }

    case 'View Tasks': {
      const tasks = manager.listTasks();
      if (tasks.length === 0) {
        console.log('📭 No tasks found.');
      } else {
        console.table(tasks);
      }
      break;
    }

    case 'Update Task': {
      const { id: updateId } = await inquirer.prompt([
        { name: 'id', message: 'Task ID to update:' }
      ]);

      const updates = await inquirer.prompt([
        {
          name: 'title',
          message: 'New Title (leave blank to keep current):',
          default: ''
        },
        {
          name: 'status',
          type: 'list',
          choices: ['pending', 'done'],
          message: 'Status:'
        }
      ]);

      manager.updateTask(updateId, updates);
      console.log('✅ Task updated.');
      break;
    }

    case 'Delete Task': {
      const { id: deleteId } = await inquirer.prompt([
        { name: 'id', message: 'Task ID to delete:' }
      ]);

      const success = manager.deleteTask(deleteId);
      console.log(success ? '🗑️ Task deleted.' : '❌ Task not found.');
      break;
    }

    case 'Exit':
      console.log('👋 Goodbye!');
      return;
  }

  await mainMenu(); // Loop back to the main menu
}

mainMenu(); // Start the application
