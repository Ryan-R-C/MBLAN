import { Task } from "../../domain/entities/task";
import { InMemoryTaskRepository } from "../../tests/in-memory-task-repository";
import { CreateTaskUseCase } from "./create-task";

describe("Create task use case", () => {
    it("should be able to create a new task", async () => {
        const taskRepository = new InMemoryTaskRepository()
        const createTaskUseCase = new CreateTaskUseCase(taskRepository) 

        expect((
            await createTaskUseCase.execute({
                title: 'fake-task-title',
                description: 'fake-task-description',
                completed: false,
            })
        )
        )
        .toBeInstanceOf(Task)
    })
})