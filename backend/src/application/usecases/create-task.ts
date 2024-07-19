import { Task, TaskProps } from "../../domain/entities/task"
import { TaskRepository } from "../repository/TaskRepository"

export type CreateTaskRequest = {
        title: string
        description: string
}


export type CreateTaskResponse = Task

export class CreateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository
    ){}

    async execute ({title, description }: CreateTaskRequest): Promise<CreateTaskResponse> {
        
        const task = Task.create({
            title, description, completed: false
        })

        const input = task
        
        await this.taskRepository.create(input)

        const output = this.presentOutput(input)

        return output
    }

    public presentOutput({title, description, completed, id}: TaskProps): CreateTaskResponse {
        const task = Task.create({
            title, description, completed
        }, id)
        
        const output = task
        

        return output
    }
}