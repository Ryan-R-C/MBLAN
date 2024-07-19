import { Task } from "../../domain/entities/task";
import { InMemoryTaskRepository } from "../../tests/in-memory-task-repository";
import { FindTaskUseCase } from "./find-task";

describe("Find task use case", () => {
    const taskRepository = new InMemoryTaskRepository()
    const findTaskUseCase = new FindTaskUseCase(taskRepository) 

    it("should be able to find a task", async () => {

        const id = crypto.randomUUID().toString()

        const newTask = Task.create({
            title: 'fake-task-title',
            description: 'fake-task-description',
            completed: false,
        }, id)

        taskRepository.items.push(newTask)

        const task = await findTaskUseCase.execute({id})

        expect(task).toBeInstanceOf(Task)
    })
    it("should return undefined on non existent id", async () => {
        const id = crypto.randomUUID().toString()

        const task = await findTaskUseCase.execute({id})

        expect(task).toBe(undefined)
    })
})
