import { Task } from "../../domain/entities/task";
import { InMemoryTaskRepository } from "../../tests/in-memory-task-repository";
import { UpdateTaskUseCase } from "./update-task";

describe("Update task use case", () => {
    it("should be able to update a new task", async () => {
        const taskRepository = new InMemoryTaskRepository()
        const updateTaskUseCase = new UpdateTaskUseCase(taskRepository) 

        expect((
            await updateTaskUseCase.execute({
                id: crypto.randomUUID().toString(),
                title: 'fake-task-title',
                description: 'fake-task-description',
                completed: false,
            })
        )
        )
        .toBeInstanceOf(Task)
    })
})