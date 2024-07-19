import { CreateTaskUseCase } from "./application/usecases/create-task"
import { DeleteTaskUseCase } from "./application/usecases/delete-task"
import { FindTaskUseCase } from "./application/usecases/find-task"
import { ListTaskUseCase } from "./application/usecases/list-task"
import { UpdateTaskUseCase } from "./application/usecases/update-task"
import { ApiExpress } from "./infra/api/express/routes/api.express"
import { CreateTaskRoute } from "./infra/api/express/routes/task/create-task.express.route"
import { DeleteTaskRoute } from "./infra/api/express/routes/task/delete-task.express.route"
import { FindTaskRoute } from "./infra/api/express/routes/task/find-task.express.route"
import { ListTaskRoute } from "./infra/api/express/routes/task/list-task.express.route"
import { UpdateTaskRoute } from "./infra/api/express/routes/task/update-task.express.route"
import { TaskRepositoryPrisma } from "./infra/repositories/task/task.repository.prisma"
import { prisma } from "./package/prisma/prisma"
import * as dotenv from 'dotenv'


function main(){
  dotenv.config({ path: '.env' })

  const repository = TaskRepositoryPrisma.create(prisma)

  const createTaskUsecase = new CreateTaskUseCase(repository) 
  const updateTaskUsecase = new UpdateTaskUseCase(repository) 
  const listTaskUsecase = new ListTaskUseCase(repository) 
  const findTaskUsecase = new FindTaskUseCase(repository) 
  const deleteTaskUsecase = new DeleteTaskUseCase(repository) 

  const createRoute = CreateTaskRoute.create(createTaskUsecase)
  const updateRoute = UpdateTaskRoute.create(updateTaskUsecase)
  const listRoute = ListTaskRoute.create(listTaskUsecase)
  const findRoute = FindTaskRoute.create(findTaskUsecase)
  const delteRoute = DeleteTaskRoute.create(deleteTaskUsecase)

  const api = ApiExpress.create([createRoute, updateRoute, findRoute, listRoute, delteRoute])

  const port = 3000
  
  api.start(port)
}

main()