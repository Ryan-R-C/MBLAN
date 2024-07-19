import { Task } from "../../domain/entities/task"
import { TaskRepository } from "../repository/TaskRepository"


export type FindTaskRequest = {
    id: string
}

export type FindTaskResponse = Task

export class FindTaskUseCase {
    constructor(
        private taskRepository: TaskRepository
    ){}

    async execute ({ id }: FindTaskRequest): Promise<FindTaskResponse | undefined> {
        const tasks = await this.taskRepository.find(id) 

        if(!tasks) return

        const output = this.presentOutput(tasks)

        return output
    }

    public presentOutput({id, title, description, completed, createdAt}: Task): FindTaskResponse {
        const task = Task.create({
            title, description, completed
        }, id, createdAt)


        const output = task

        return output
    }
}