import { Task } from "../../domain/entities/task";
import { InMemoryTaskRepository } from "../../tests/in-memory-task-repository";
import { DeleteTaskUseCase } from "./delete-task";

describe("Delete task use case", () => {
    const taskRepository = new InMemoryTaskRepository()
    const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository) 

    it("should be able to delete a task", async () => {

        const id = crypto.randomUUID().toString()

        const newTask = Task.create({
            title: 'fake-task-title',
            description: 'fake-task-description',
            completed: false,
        }, id)

        taskRepository.items.push(newTask)

        const task = await deleteTaskUseCase.execute({id})

        expect(task).toBeInstanceOf(Task)
    })
    it("should return undefined on non existent id", async () => {
        const id = crypto.randomUUID().toString()

        const task = await deleteTaskUseCase.execute({id})

        expect(task).toBe(undefined)
    })
})
