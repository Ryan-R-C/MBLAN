import { Task } from "./task";

describe('Create an task', () => {
    it('should be able create a valid task', () => {
        const task = Task.create({
            title: 'fake-task-title',
            description: 'fake-task-description',
            completed: false
        })
    
        expect(task).toBeInstanceOf(Task)
        expect(task.title).toEqual('fake-task-title')
    })
    
    it('should throw error on create an invalid title', () => {
        expect(
            () => Task.create({
                title: '',
                description: 'fake-task-description',
                completed: false
            })
        ).toThrow('Title should be defined')
    })
    it('should throw error on create an invalid description', () => {
        expect(
            () => Task.create({
                title: 'fake-task-title',
                description: '',
                completed: false
            })
        ).toThrow('Description should be defined')
    })
})