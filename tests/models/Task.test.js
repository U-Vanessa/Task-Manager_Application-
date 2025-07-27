import Task from '../../models/Task.js';

describe('Task Model', () => {
  const validDate = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Tomorrow
  const expiredDate = new Date(Date.now() - 86400000).toISOString().split('T')[0]; // Yesterday

    describe('Instantiation', () => {
        it('should create with valid properties', () => {
        const task = new Task('1', 'Valid', 'Description', validDate, 'pending', 'medium');
        expect(task).toEqual(expect.objectContaining({
            title: 'Valid',
            status: 'pending',
            priority: 'medium'
        }));
        });

        it('should throw on missing required fields', () => {
        expect(() => new Task()).toThrow();
        expect(() => new Task('1')).toThrow();
        expect(() => new Task('1', 'Title')).toThrow();
        });
    });

    describe('Property Validation', () => {
        describe('Priority', () => {
        it('should accept valid priorities (low/medium/high)', () => {
            expect(() => new Task('1', 'Test', 'Desc', validDate, 'pending', 'low')).not.toThrow();
            expect(() => new Task('1', 'Test', 'Desc', validDate, 'pending', 'high')).not.toThrow();
        });

        it('should reject invalid priorities', () => {
            expect(() => new Task('1', 'Test', 'Desc', validDate, 'pending', 'urgent'))
            .toThrow('Invalid priority value');
        });
        });

        describe('Status', () => {
        it('should accept valid statuses (pending/completed)', () => {
            expect(() => new Task('1', 'Test', 'Desc', validDate, 'completed', 'low')).not.toThrow();
        });

        it('should default to "pending"', () => {
            const task = new Task('1', 'Test', 'Desc', validDate, undefined, 'low');
            expect(task.status).toBe('pending');
        });

        it('should reject invalid statuses', () => {
            expect(() => new Task('1', 'Test', 'Desc', validDate, 'invalid', 'low'))
            .toThrow('Invalid status value');
        });
        });

        describe('Due Date', () => {
        it('should accept ISO format dates', () => {
            expect(() => new Task('1', 'Test', 'Desc', '2023-12-31', 'pending', 'low'))
            .not.toThrow();
        });

        it('should reject expired dates', () => {
            expect(() => new Task('1', 'Test', 'Desc', expiredDate, 'pending', 'low'))
            .toThrow('Due date cannot be in the past');
        });

        it('should reject malformed dates', () => {
            expect(() => new Task('1', 'Test', 'Desc', '31-12-2023', 'pending', 'low'))
            .toThrow('Invalid date format');
        });
        });
    });

    describe('Methods', () => {
        let task;

        beforeEach(() => {
        task = new Task('1', 'Test', 'Description', validDate, 'pending', 'high');
        });

        describe('markComplete()', () => {
        it('should change status to completed', () => {
            task.markComplete();
            expect(task.status).toBe('completed');
        });

        it('should not change completed tasks', () => {
            task.status = 'completed';
            task.markComplete();
            expect(task.status).toBe('completed');
        });
        });

        describe('isOverdue()', () => {
        it('should return false for future dates', () => {
            expect(task.isOverdue()).toBe(false);
        });

        it('should return true for past dates', () => {
            task.dueDate = expiredDate;
            expect(task.isOverdue()).toBe(true);
        });

        it('should return false for completed tasks', () => {
            task.dueDate = expiredDate;
            task.status = 'completed';
            expect(task.isOverdue()).toBe(false);
        });
        });

        describe('update()', () => {
        it('should validate new values', () => {
            expect(() => task.update({ priority: 'invalid' }))
            .toThrow('Invalid priority value');
        });

        it('should preserve unchanged values', () => {
            task.update({ title: 'New Title' });
            expect(task.description).toBe('Description'); // Original value remains
            expect(task.title).toBe('New Title');
        });
        });
    });
});