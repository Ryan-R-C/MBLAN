import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { FindTaskResponse, FindTaskUseCase } from "../../../../../application/usecases/find-task"

export type FindTaskResponseDto = {
        id: string
        title: string
        description: string
        completed: boolean
        createdAt: Date
}

export class FindTaskRoute implements Route {
    private constructor (
            private readonly path: string,
            private readonly method: HttpMethod,
            private readonly findTaskService: FindTaskUseCase
    ){}

    public static create(findTaskService: FindTaskUseCase){
        return new FindTaskRoute(
            "/tasks/:id",
            HttpMethod.GET,
            findTaskService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const id = request.params.id as string ?? ''
            const output = await this.findTaskService.execute({id})
           
            if(!output){
                response.status(404).send()
                return
            }

            const responseBody = this.present(output)

            response.status(200).json(responseBody);

        }
    }

    private present(input: FindTaskResponse): FindTaskResponseDto {
        const response: FindTaskResponseDto = {
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