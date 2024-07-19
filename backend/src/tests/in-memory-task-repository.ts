import { TaskRepository } from "../application/repository/TaskRepository";
import { Task } from "../domain/entities/task";

export class InMemoryTaskRepository implements TaskRepository {
    public items: Task[] = []
    
    async create(task: Task){
        this.items.push(task)
        return task
    }

    async update(task: Task){
        const indexToUpdate = this.items.findIndex(item => item.props.id === task.id)
        this.items[indexToUpdate] = task
        return task
    }

    async list() : Promise<Task[]>{
        return this.items
    }

    
    async find(id: string) : Promise<Task>{
        const task = this.items.find(item => item.id === id)
        return task as Task
    }
    
    async delete(id: string) : Promise<Task>{
        const indexToUpdate = this.items.findIndex(item => item.props.id === id)
        const task = this.items[indexToUpdate]
        this.items.splice(indexToUpdate, 1)
        return task
    }
}