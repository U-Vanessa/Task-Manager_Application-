import fs from 'fs';
import path from 'path';
import { readTasks, writeTasks } from '../../utils/fileHandler.js';

// Mock fs and path
jest.mock('fs');
jest.mock('path');

describe('fileHandler', () => {
    const mockData = [{ id: '1', title: 'Mock Task' }];
    const mockFilePath = '/fake/path/tasks.json';

    beforeEach(() => {
        path.join.mockReturnValue(mockFilePath);
        jest.clearAllMocks();
    });

    describe('readTasks()', () => {
        it('should return parsed JSON when file exists', () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));

        expect(readTasks()).toEqual(mockData);
        expect(fs.readFileSync).toHaveBeenCalledWith(mockFilePath, 'utf-8');
        });

        it('should return empty array when file missing', () => {
        fs.existsSync.mockReturnValue(false);
        expect(readTasks()).toEqual([]);
        });

        it('should throw on corrupt JSON', () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('invalid-json');
        expect(() => readTasks()).toThrow(SyntaxError);
        });
    });

    describe('writeTasks()', () => {
        it('should stringify and write data', () => {
        writeTasks(mockData);
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            mockFilePath,
            JSON.stringify(mockData, null, 2)
        );
        });
    });
});