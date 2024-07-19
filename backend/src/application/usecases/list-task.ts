import { Task } from "../../domain/entities/task"
import { TaskRepository } from "../repository/TaskRepository"


export type ListTaskRequest = {
    filter?: string
}

export type ListTaskResponse = Task[]

export class ListTaskUseCase {
    constructor(
        private taskRepository: TaskRepository
    ){}

    async execute ({ filter }: ListTaskRequest): Promise<ListTaskResponse> {
        const tasks = await this.taskRepository.list(filter) 

        const output = this.presentOutput(tasks)

        return output
    }

    public presentOutput(items: Task[]): ListTaskResponse {
        const output = items.map(({ id, title, description, completed, createdAt }) => {
            const task = Task.create({
                title, description, completed
            }, id, createdAt)

            return task
        })

        return output
    }
}