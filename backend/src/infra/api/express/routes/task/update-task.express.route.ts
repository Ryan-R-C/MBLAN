import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { TaskProps } from "../../../../../domain/entities/task"
import { UpdateTaskRequest, UpdateTaskResponse, UpdateTaskUseCase } from "../../../../../application/usecases/update-task"

export type UpdateTaskResponseDto = {
    id: string
    title: string
    description: string
    completed: boolean
}



export type UpdateTaskRequestDto = {
    title: string
    description: string
    completed: boolean
}


export class UpdateTaskRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTaskService: UpdateTaskUseCase,
    ){}

    public static create(updateTaskService: UpdateTaskUseCase){
        return new UpdateTaskRoute(
            "/tasks/:id",
            HttpMethod.PUT,
            updateTaskService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const id = request.params.id

            const input: UpdateTaskRequest = {
                id,
                title: request?.body.title,
                description: request?.body.description,
                completed: request?.body.completed,
            }

            const output: UpdateTaskResponse = await this.updateTaskService.execute(input)
            
            if(!output){
                response.status(404).json().send()
                return
            }

            const responseBody = this.present(output)

            response.status(201).json(responseBody);
        }
    }

    private present(input: UpdateTaskResponseDto): UpdateTaskResponseDto {
        const response: UpdateTaskResponseDto = {
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