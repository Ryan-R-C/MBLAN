import { Task } from "../../domain/entities/task"
import { TaskRepository } from "../repository/TaskRepository"


export type DeleteTaskRequest = {
    id: string
}

export type DeleteTaskResponse = Task

export class DeleteTaskUseCase {
    constructor(
        private taskRepository: TaskRepository
    ){}

    async execute ({ id }: DeleteTaskRequest): Promise<DeleteTaskResponse | undefined> {
        const createdTask = await this.taskRepository.find(id)

        if(!createdTask) return
        
        const tasks = await this.taskRepository.delete(id) 

        if(!tasks) return

        const output = this.presentOutput(tasks)

        return output
    }

    public presentOutput({id, title, description, completed, createdAt}: Task): DeleteTaskResponse {
        const task = Task.create({
            title, description, completed
        }, id, createdAt)


        const output = task

        return output
    }
}