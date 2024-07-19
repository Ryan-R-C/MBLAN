import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { DeleteTaskResponse, DeleteTaskUseCase } from "../../../../../application/usecases/delete-task"

export type DeleteTaskResponseDto = {
        id: string
        title: string
        description: string
        completed: boolean
        createdAt: Date
}

export class DeleteTaskRoute implements Route {
    private constructor (
            private readonly path: string,
            private readonly method: HttpMethod,
            private readonly deleteTaskService: DeleteTaskUseCase
    ){}

    public static create(deleteTaskService: DeleteTaskUseCase){
        return new DeleteTaskRoute(
            "/tasks/:id",
            HttpMethod.DELETE,
            deleteTaskService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const id = request.params.id as string ?? ''
            const output = await this.deleteTaskService.execute({id})
           
            if(!output){
                response.status(404).send()
                return
            }

            const responseBody = this.present(output)

            response.status(200).json(responseBody);

        }
    }

    private present(input: DeleteTaskResponse): DeleteTaskResponseDto {
        const response: DeleteTaskResponseDto = {
            id: input.id,
            title: input.title,
            description: input.description,
            completed: input.completed,
            createdAt: input.createdAt,
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