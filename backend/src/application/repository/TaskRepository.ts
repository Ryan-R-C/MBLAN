import { Task, TaskProps } from "../../domain/entities/task";

export interface TaskRepository {
    create(task: Task): Promise<TaskProps>
    update(task: Task): Promise<TaskProps>
    list(filter?: string): Promise<Task[]>
    find(id: string): Promise<Task | undefined>
    delete(id: string): Promise<Task | undefined>
}