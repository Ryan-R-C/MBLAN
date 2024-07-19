import { Task } from "../../domain/entities/task";
import { InMemoryTaskRepository } from "../../tests/in-memory-task-repository";
import { ListTaskUseCase } from "./list-task";

describe("List task use case", () => {
    it("should be able to create a new task", async () => {
        const taskRepository = new InMemoryTaskRepository()
        const listTaskUseCase = new ListTaskUseCase(taskRepository) 

        const newTask = Task.create({
            title: 'fake-task-title',
            description: 'fake-task-description',
            completed: false,
        })

        taskRepository.items.push(newTask)

        const tasks = await listTaskUseCase.execute({})

        expect(
            tasks.every(task => task instanceof Task)
        ).toBeTruthy()
    })
})
