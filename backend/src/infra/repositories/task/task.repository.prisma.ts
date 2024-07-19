import { PrismaClient } from "@prisma/client";
import { Task, TaskProps } from "../../../domain/entities/task";
import { TaskRepository } from "../../../application/repository/TaskRepository";

export class TaskRepositoryPrisma implements TaskRepository {
    private constructor(private readonly prismaClient: PrismaClient){}
    
    public static create(prismaClient: PrismaClient){
        return new TaskRepositoryPrisma(prismaClient)
    }

    public async create(task: Task): Promise<TaskProps> {
        const createdTask = await this.prismaClient.task.create({
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                completed: task.completed,
                createdAt: task.createdAt,
            }
        })

        return createdTask
    }
    
    
    public async update(task: Task): Promise<TaskProps> {
        const createdTask = await this.prismaClient.task.update({
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                completed: task.completed,
                createdAt: task.createdAt,
            },
            where: {
                id: task.id
            }
        })

        return createdTask
    }

    public async find(id: string): Promise<Task | undefined> {
        const data = await this.prismaClient.task.findFirst(
            {
                where: { id },
            }
        );

        if(!data) return 

        const task = Task.create({
            title: data.title,
            description: data.description,
            completed: data.completed,
        }, data.id, data.createdAt)

        return task
    }

    
    public async delete(id: string): Promise<Task | undefined> {
        const data = await this.prismaClient.task.delete(
            {
                where: { id },
            }
        );

        const task = Task.create({
            title: data.title,
            description: data.description,
            completed: data.completed,
        }, data.id, data.createdAt)

        return task
    }


    
    public async list(filter?: string): Promise<Task[]> {
        const tasks = await this.prismaClient.task.findMany(
            {
                ...(filter && { where: { title: {
                    contains: filter
                } } }),
                orderBy: {
                    createdAt: 'asc'
                }
            }
        );
        
        const taskList = tasks?.map((i) => {
            const task = Task.create({
                title: i.title,
                description: i.description,
                completed: i.completed,
            }, i.id, i.createdAt)

            return task
        })

        return taskList
    }
    
}