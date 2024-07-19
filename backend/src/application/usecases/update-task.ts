import { Task, TaskProps } from "../../domain/entities/task"
import { TaskRepository } from "../repository/TaskRepository"

export type UpdateTaskRequest = {
        id: string
        title: string
        description: string
        completed: boolean
}


export type UpdateTaskResponse = Task | undefined

export class UpdateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository
    ){}

    async execute ({title, description, completed, id }: UpdateTaskRequest): Promise<UpdateTaskResponse> {
        const createdTask = await this.taskRepository.find(id)

        if(!createdTask) return

        const task = Task.create({
            title, description, completed
        }, id, createdTask?.createdAt)

        const input = task
        
        await this.taskRepository.update(input)

        const output = this.presentOutput(input)

        return output
    }

    public presentOutput({title, description, completed, id}: TaskProps): UpdateTaskResponse {
        const task = Task.create({
            title, description, completed
        }, id)
        
        const output = task
        

        return output
    }
}