import TaskManager from '../../services/TaskManager.js';
import { readTasks, writeTasks } from '../../utils/fileHandler.js';
import Task from '../../models/Task.js';
import { v4 as uuidv4 } from 'uuid';

// Mock dependencies
jest.mock('../../utils/fileHandler.js');
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-uuid')
}));

describe('TaskManager', () => {
    let taskManager;
    const mockTasks = [
        new Task('1', 'Task 1', 'Description 1', '2023-12-01', 'pending', 'low'),
        new Task('2', 'Task 2', 'Description 2', '2023-12-15', 'completed', 'high')
    ];

    beforeEach(() => {
        readTasks.mockReturnValue([...mockTasks]);
        writeTasks.mockImplementation(() => {});
        taskManager = new TaskManager();
    });

    describe('addTask()', () => {
        it('should add a new task with generated UUID', () => {
        const newTask = taskManager.addTask('New', 'Desc', '2023-12-31', 'medium');
        
        expect(newTask).toMatchObject({
            id: 'mocked-uuid',
            title: 'New',
            status: 'pending' // Default value
        });
        expect(taskManager.tasks).toHaveLength(3);
        expect(writeTasks).toHaveBeenCalled();
        });

        it('should validate priority levels', () => {
        expect(() => {
            taskManager.addTask('Bad', 'Task', '2023-12-31', 'invalid');
        }).toThrow('Invalid priority value');
        });
    });

    describe('updateTask()', () => {
        it('should update existing task fields', () => {
        const updated = taskManager.updateTask('1', {
            title: 'Updated',
            status: 'completed'
        });
        
        expect(updated.title).toBe('Updated');
        expect(updated.status).toBe('completed');
        expect(writeTasks).toHaveBeenCalled();
        });

        it('should return null for non-existent ID', () => {
        expect(taskManager.updateTask('999', { title: 'New' })).toBeNull();
        });
    });

    describe('deleteTask()', () => {
        it('should remove task by ID', () => {
        expect(taskManager.deleteTask('1')).toBe(true);
        expect(taskManager.tasks).toHaveLength(1);
        });

        it('should return false for non-existent ID', () => {
        expect(taskManager.deleteTask('999')).toBe(false);
        });
    });
});