import { Request, Response } from "express"
import { HttpMethod, Route } from "../route"
import { ListTaskResponse, ListTaskUseCase } from "../../../../../application/usecases/list-task"

export type ListTaskResponseDto = {
        id: string
        title: string
        description: string
        completed: boolean
}[]

export class ListTaskRoute implements Route {
    private constructor (
            private readonly path: string,
            private readonly method: HttpMethod,
            private readonly listTaskService: ListTaskUseCase
    ){}

    public static create(listTaskService: ListTaskUseCase){
        return new ListTaskRoute(
            "/tasks",
            HttpMethod.GET,
            listTaskService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const filter = request.query.q as string ?? ''
            const output = await this.listTaskService.execute({filter})
           

            const responseBody = this.present(output)

            response.status(200).json(responseBody);

        }
    }

    private present(input: ListTaskResponse): ListTaskResponseDto {
        const response: ListTaskResponseDto = input.map(i => {
            return {
                id: i.id,
                title: i.title,
                description: i.description,
                completed: i.completed,
                createdAt: i.createdAt,
            }
        })
        

        return response
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    } 
    
}