import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { TaskProps } from "../../../../../domain/entities/task"
import { CreateTaskRequest, CreateTaskResponse, CreateTaskUseCase } from "../../../../../application/usecases/create-task"

export type CreateTaskResponseDto = {
    id: string
    title: string
    description: string
    completed: boolean
}



export type CreateTaskRequestDto = {
    title: string
    description: string
    completed: boolean
}


export class CreateTaskRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTaskService: CreateTaskUseCase,
    ){}

    public static create(createTaskService: CreateTaskUseCase){
        return new CreateTaskRoute(
            "/tasks",
            HttpMethod.POST,
            createTaskService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            console.log(request?.body)
            const input: CreateTaskRequest = {
                title: request?.body.title,
                description: request?.body.description,
            }

            const output: CreateTaskResponse = await this.createTaskService.execute(input)

            const responseBody = this.present(output)

            response.status(201).json(responseBody);
        }
    }

    private present(input: CreateTaskResponseDto): CreateTaskResponseDto {
        const response: CreateTaskResponseDto = {
            id: input.id,
            title: input.title,
            description: input.description,
            completed: input.completed,
        }
        
        return response
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    } 

}